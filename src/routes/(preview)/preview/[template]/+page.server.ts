import { existsSync, readFileSync } from 'fs';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';
import type { RouteId } from '$app/types';

type ExtractTemplateName<T extends string> =
	T extends `/templates/${infer Name}` ? Name : never;

type TemplateName = ExtractTemplateName<RouteId>;

const isValidTemplate = (template: string): template is TemplateName => {
	return existsSync(`src/routes/templates/${template}`);
};

export const load = (async ({ params }) => {
	const { template } = params;

	if (!isValidTemplate(template)) {
		console.error(`Template "${template}" not found`);
		return error(404, 'Template not found');
	}

	const srcDir = `src/routes/templates/${template}`;

	const description = existsSync(`${srcDir}/README.md`)
		? await marked.parse(readFileSync(`${srcDir}/README.md`, 'utf-8'))
		: `<p><em>no description provided</em></p>`;

	const { gamVariables } = existsSync(`${srcDir}/variables.gam.ts`)
		? // this import must be relative, so that vite can statically analyze it
			((await import(`../../../templates/${template}/variables.gam.ts`)) as {
				gamVariables: Record<string, string | number>;
			})
		: { gamVariables: null };

	const adJson = existsSync(`${srcDir}/ad.json`)
		? (JSON.parse(readFileSync(`${srcDir}/ad.json`, 'utf-8')) as {
				nativeStyleId: string;
				creativeTemplateId: string;
				testNativeStyleId: string;
				testCreativeId: string;
			})
		: null;

	return {
		description,
		template,
		gamVariables,
		adJson,
	};
}) satisfies PageServerLoad;
