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
 * A node from the JavaScript parser. The parser turns the script into a big tree
 * of these; we only ever need a node's `type` and where it sits in the source
 * (`start` and `end`)
 */
type AstNode = {
	type: string;
	start: number;
	end: number;
	value?: unknown;
};

/** True when `value` looks like a node from the parser */
const isAstNode = (value: unknown): value is AstNode => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;
	return (
		typeof candidate.type === 'string' &&
		typeof candidate.start === 'number' &&
		typeof candidate.end === 'number'
	);
};

/** A chunk of the script, from `start` up to but not including `end`. */
type TextRange = { start: number; end: number };

/**
 * Make an inline script safe to drop into an HTML ad slot.
 *
 * Google Ad Manager's SafeFrame reads our whole ad as HTML. If
 * they spot something that looks like an HTML tag inside our script, even
 * though it's only text sitting inside some JavaScript, they cut the script
 * short and dump the rest onto the page as visible text, which breaks the ad.
 *
 * Svelte's compiled code is full of HTML written as text, for example:
 *     someFunction("<header><h1>Hello</h1></header>")
 * The "<" characters there are what trips the ad server up.
 *
 * So we swap every "<" that sits inside a piece of text for "\x3c". The browser
 * reads "\x3c" as "<", so the script still does exactly the same thing — but the
 * saved file no longer contains anything that looks like a tag.
 *
 * We ask the JavaScript parser which "<" are inside text and which are code,
 * so we never change the wrong one.
 */
export const escapeScriptMarkup = (code: string): string => {
	if (!code.includes('<')) {
		return code;
	}

	// Find where every piece of text lives in the script. A piece of text is
	// either a string or the literal characters in a `template`.
	const findTextRanges = (node: AstNode): TextRange[] => {
		const isText =
			(node.type === 'Literal' && typeof node.value === 'string') ||
			node.type === 'TemplateElement';

		if (isText) {
			return [{ start: node.start, end: node.end }];
		}

		// Otherwise, look through this node's children for more text.
		return Object.values(node).flat().filter(isAstNode).flatMap(findTextRanges);
	};

	const textRanges = findTextRanges(parseAst(code)).sort(
		(a, b) => a.start - b.start,
	);

	// Rebuild the script, escaping "<" only inside those pieces of text.
	let result = '';
	let position = 0;
	for (const { start, end } of textRanges) {
		result += code.slice(position, start);
		result += code.slice(start, end).replaceAll('<', '\\x3c');
		position = end;
	}
	result += code.slice(position);

	// Safety net: swapping "<" for "\x3c" should always leave valid JavaScript.
	// If it somehow doesn't, stop the build rather than ship a broken ad.
	try {
		parseAst(result);
	} catch (error) {
		throw new Error(
			`Escaping "<" produced invalid JavaScript in an inline script: ${String(error)}`,
		);
	}

	return result;
};

/**
 * Clean up every `<script>` in the page body so the extracted ad is safe to
 * show inside an ad slot.
 */
const escapeInlineScripts = (dom: JSDOM) => {
	const scripts = dom.window.document.querySelectorAll('body script');
	scripts.forEach((script) => {
		script.textContent = escapeScriptMarkup(script.textContent);
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
