import { existsSync } from 'fs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RouteId } from '$app/types';

type ExtractTemplateName<T extends string> =
	T extends `/templates/${infer Name}` ? Name : never;

type TemplateName = ExtractTemplateName<RouteId>;

const isValidTemplate = (template: string): template is TemplateName => {
	return existsSync(`src/routes/templates/${template}`);
};

export const load = (({ params }) => {
	const { template } = params;

	if (!isValidTemplate(template)) {
		console.error(`Template "${template}" not found`);
		return error(404, 'Template not found');
	}

	return {
		template,
	};
}) satisfies PageServerLoad;
