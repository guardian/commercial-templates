import {
	copyFile,
	mkdir,
	readdir,
	readFile,
	writeFile,
} from 'node:fs/promises';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

/**
 * Extract CSS styles from the DOM
 *
 * @param {JSDOM} dom
 */
const extractStyles = (dom) => {
	const styles = dom.window.document.querySelectorAll('head style');
	let cssContent = '';

	styles.forEach((style) => {
		cssContent += style.textContent + '\n\n';
	});

	return cssContent.trim();
};

/**
 * Extract body HTML from the DOM
 *
 * @param {JSDOM} dom
 */
const extractHtml = (dom) => {
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
function extractAssets(fullHtml, templateName) {
	const dom = new JSDOM(fullHtml);

	const css = extractStyles(dom);
	const html = extractHtml(dom);

	const comment = `<!-- '${templateName}' updated on ${new Date().toISOString()} -->\n`;

	return {
		css: css ? comment + css : null,
		html: html ? comment + html : null,
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
 * @returns {import('vite').Plugin} Vite plugin object
 */
export function extractTemplateAssets() {
	return {
		name: 'extract-template-assets',
		apply: 'build',
		closeBundle: async () => {
			const buildDir = 'build/templates';
			const outDir = 'build/extracted-templates';

			try {
				const templates = await readdir(buildDir, { withFileTypes: true });

				for (const template of templates) {
					if (!template.isDirectory()) {
						continue;
					}

					const srcDir = join('src/routes/templates', template.name);
					const templateDir = join(buildDir, template.name);
					const templateOutDir = join(outDir, template.name);
					const htmlPath = join(templateDir, 'index.html');
					const adJsonPath = join(srcDir, 'ad.json');

					await mkdir(templateOutDir, { recursive: true });

					try {
						// Copy ad.json as-is
						await copyFile(adJsonPath, join(templateOutDir, 'ad.json'));
						console.log(`  ✓ ${template.name}/ad.json copied`);
					} catch (err) {
						if (
							err &&
							typeof err === 'object' &&
							'code' in err &&
							err.code !== 'ENOENT'
						) {
							console.error(
								`  ✗ Error copying ad.json for ${template.name}:`,
								err,
							);
						}
					}

					try {
						const html = await readFile(htmlPath, 'utf-8');
						const extracted = extractAssets(html, template.name);

						// Write CSS file
						if (extracted.css) {
							await writeFile(
								join(templateOutDir, 'style.css'),
								extracted.css,
								'utf-8',
							);
							console.log(`  ✓ ${template.name}/style.css`);
						}

						// Write body-only HTML (for GAM native ad HTML field)
						if (extracted.html) {
							await writeFile(
								join(templateOutDir, 'index.html'),
								extracted.html,
								'utf-8',
							);
							console.log(`  ✓ ${template.name}/index.html`);
						}
					} catch (err) {
						if (
							err &&
							typeof err === 'object' &&
							'code' in err &&
							err.code !== 'ENOENT'
						) {
							console.error(`  ✗ Error processing ${template.name}:`, err);
						}
					}
				}

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
