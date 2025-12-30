import { existsSync, readFileSync } from 'fs';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { template } = params;

	const srcDir = `src/routes/templates/${template}`;
	const outDir = `build/templates/${template}`;

	const description = existsSync(`${srcDir}/README.md`)
		? await marked.parse(readFileSync(`${srcDir}/README.md`, 'utf-8'))
		: `<p><em>no description provided</em></p>`;

	const { config: defaultProps } = (await import(
		`../../../templates/${template}/+page.server.ts`
	)) as { config: Record<string, string> };

	const html = existsSync(`${outDir}/html.html`)
		? readFileSync(`${outDir}/html.html`, 'utf-8')
		: '';

	const css = existsSync(`${outDir}/style.css`)
		? readFileSync(`${outDir}/style.css`, 'utf-8')
		: '';

	return {
		description,
		template,
		defaultProps,
		html,
		css,
	};
}) satisfies PageServerLoad;
