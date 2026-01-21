import { existsSync, readFileSync } from 'fs';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { template } = params;

	const srcDir = `src/routes/templates/${template}`;

	const description = existsSync(`${srcDir}/README.md`)
		? await marked.parse(readFileSync(`${srcDir}/README.md`, 'utf-8'))
		: `<p><em>no description provided</em></p>`;

	const { gamVariables } = (await import(
		`../../../templates/${template}/variables.gam.ts`
	)) as { gamVariables: Record<string, string> };

	return {
		description,
		template,
		gamVariables,
	};
}) satisfies PageServerLoad;
