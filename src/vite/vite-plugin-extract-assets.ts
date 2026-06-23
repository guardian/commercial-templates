import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { parseAst, type Plugin } from 'vite';

const buildTemplate = process.env.BUILD_TEMPLATE;

/**
 * Extract CSS styles from the DOM
 * */
const extractStyles = (dom: JSDOM) => {
	const styles = dom.window.document.querySelectorAll('head style');
	let cssContent = '';

	styles.forEach((style) => {
		cssContent += style.textContent + '\n\n';
	});

	return cssContent.trim();
};

/**
 * Recursively collect the `[start, end)` source ranges of every string literal
 * and template-literal text chunk (`TemplateElement`) in an ESTree AST. These
 * are the only places a `<` is literal text rather than a JS operator
 * (`i < e.length`, `1 << 24`), so they are the only places it is safe to escape.
 *
 * @param {unknown} node - An AST node, array of nodes, or primitive.
 * @param {Array<[number, number]>} ranges - Accumulator of `[start, end)` pairs.
 */
const collectLiteralRanges = (
	node: unknown,
	ranges: Array<[number, number]>,
): void => {
	if (!node || typeof node !== 'object') {
		return;
	}

	if (Array.isArray(node)) {
		node.forEach((child) => collectLiteralRanges(child, ranges));
		return;
	}

	const n = node as {
		type?: string;
		start: number;
		end: number;
		value?: unknown;
	};

	if (
		(n.type === 'Literal' && typeof n.value === 'string') ||
		n.type === 'TemplateElement'
	) {
		ranges.push([n.start, n.end]);
		return;
	}

	Object.values(n).forEach((child) => collectLiteralRanges(child, ranges));
};

/**
 * Escape HTML-like sequences inside inline <script> bodies.
 *
 * Google Ad Manager renders native creatives through SafeFrame, which re-parses
 * the creative HTML in a tag-aware mode that is NOT script-aware. Any `<` that
 * starts a tag-like sequence inside an inline script (`<header`, `</h1>`, `<!`)
 * ends the script early on the live site and dumps the rest of the bundle onto
 * the page as raw text. Svelte's compiled output embeds exactly these sequences
 * in its template strings (e.g. `we("<header><h1>...</h1></header>")`).
 *
 * Every such `<` lives inside a JS string or template literal, so we replace it
 * with its `\x3c` escape. `\x3c` === `<` within a literal, so the runtime value
 * is unchanged while the served source contains no tag-like `<` for SafeFrame to
 * trip on. Operator `<` in code is left alone: the AST tells us which `<`
 * characters are inside literals and which are expressions.
 *
 * @param {JSDOM} dom
 */
const escapeInlineScripts = (dom: JSDOM) => {
	const scripts = dom.window.document.querySelectorAll('body script');
	scripts.forEach((script) => {
		const original = script.textContent;
		if (!original.includes('<')) {
			return;
		}

		const ast = parseAst(original);
		const ranges: Array<[number, number]> = [];
		collectLiteralRanges(ast, ranges);
		ranges.sort((a, b) => a[0] - b[0]);

		let escaped = '';
		let cursor = 0;
		for (const [start, end] of ranges) {
			escaped += original.slice(cursor, start);
			escaped += original.slice(start, end).replaceAll('<', '\\x3c');
			cursor = end;
		}
		escaped += original.slice(cursor);

		// Escaping only rewrites `<` inside literals, so the result is always
		// valid JS. Re-parse as a guard so any future change that breaks this
		// assumption fails the build loudly instead of shipping broken JS.
		try {
			new dom.window.Function(escaped);
		} catch (err) {
			throw new Error(
				`Escaping < to \\x3c produced invalid JS in an inline script. Original error: ${String(err)}`,
			);
		}

		script.textContent = escaped;
	});
};

/**
 * Extract body HTML from the DOM
 *
 * @param {JSDOM} dom
 */
const extractHtml = (dom: JSDOM) => {
	const body = dom.window.document.querySelector('body');
	return body ? body.innerHTML.trim() : '';
};

/**
 * Extract CSS, JS, and body HTML from a SvelteKit-generated HTML file
 *
 * @param {string} fullHtml - The full HTML content
 * @param {string} templateName - The name of the template (for comments)
 * @returns {{css: string|null, html: string|null}}
 */
function extractAssets(fullHtml: string, templateName: string) {
	const dom = new JSDOM(fullHtml);

	escapeInlineScripts(dom);

	const css = extractStyles(dom);
	const html = extractHtml(dom);

	const htmlComment = `<!-- '${templateName}' updated on ${new Date().toISOString()} -->\n`;
	const cssComment = `/* '${templateName}' updated on ${new Date().toISOString()} */\n`;
	return {
		css: css ? cssComment + css : null,
		html: html ? htmlComment + html : null,
	};
}

/**
 * Vite plugin to extract CSS and JS from SvelteKit-generated HTML files
 * for use with Google Ad Manager native ads.
 *
 * After build, this plugin:
 * 1. Finds all template HTML files in build/templates/
 * 2. Extracts inline <style> content to style.css
 * 3. Extracts inline <script> content to script.js
 * 4. Creates a stripped HTML file with just the body content
 *
 */
export function extractTemplateAssets(): Plugin {
	return {
		name: 'extract-template-assets',
		apply: 'build',
		closeBundle: async () => {
			if (!buildTemplate) {
				return;
			}

			console.log(`\nExtracting assets for template: ${buildTemplate}\n`);
			const buildDir = `build/templates/${buildTemplate}`;
			const outDir = 'build/extracted-templates';

			try {
				const srcDir = join('src/routes/templates', buildTemplate);
				const templateOutDir = join(outDir, buildTemplate);
				const htmlPath = join(buildDir, 'index.html');
				const adJsonPath = join(srcDir, 'ad.json');

				await mkdir(templateOutDir, { recursive: true });

				try {
					// Copy ad.json as-is
					await copyFile(adJsonPath, join(templateOutDir, 'ad.json'));
					console.log(`  ✓ ${buildTemplate}/ad.json copied`);
				} catch (err) {
					if (
						err &&
						typeof err === 'object' &&
						'code' in err &&
						err.code !== 'ENOENT'
					) {
						console.error(
							`  ✗ Error copying ad.json for ${buildTemplate}:`,
							err,
						);
					}
				}

				try {
					console.log(`  → Processing ${htmlPath}`);
					const html = await readFile(htmlPath, 'utf-8');
					console.log(`  ✓ ${buildTemplate}/index.html read`);
					const extracted = extractAssets(html, buildTemplate);

					// Write CSS file
					if (extracted.css) {
						await writeFile(
							join(templateOutDir, 'style.css'),
							extracted.css,
							'utf-8',
						);
						console.log(`  ✓ ${buildTemplate}/style.css`);
					}

					// Write body-only HTML (for GAM native ad HTML field)
					if (extracted.html) {
						await writeFile(
							join(templateOutDir, 'index.html'),
							extracted.html,
							'utf-8',
						);
						console.log(`  ✓ ${buildTemplate}/index.html`);
					}
				} catch (err) {
					if (
						err &&
						typeof err === 'object' &&
						'code' in err &&
						err.code !== 'ENOENT'
					) {
						console.error(`  ✗ Error processing ${buildTemplate}:`, err);
					}
				}
				// }

				console.log('\n✓ Template assets extracted successfully\n');
			} catch (err) {
				if (
					err &&
					typeof err === 'object' &&
					'code' in err &&
					err.code === 'ENOENT'
				) {
					console.log(
						'No templates directory found, skipping asset extraction',
					);
				} else {
					console.error('Error extracting template assets:', err);
				}
			}
		},
	};
}
