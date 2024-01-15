import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';

/**
 * Write the template to the build-static directory so that it can be uploaded to GAM
 *
 * @param template The name of the template
 * @param html The HTML to write
 * @param css The CSS to write
 */
const writeTemplate = (template: string, type: 'ssr' | 'csr', html: string, css: string) => {
	const outDir = `build-static/${template}`;

	mkdirSync(outDir, { recursive: true });

	writeFileSync(`${outDir}/index.html`, html, 'utf-8');
	writeFileSync(`${outDir}/style.css`, css, 'utf-8');

	const adJSON = `src/templates/${type}/${template}/ad.json`;

	if (existsSync(adJSON)) {
		copyFileSync(adJSON, `${outDir}/ad.json`);
	}
};

export { writeTemplate };
