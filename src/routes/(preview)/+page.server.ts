import { readdir } from 'fs/promises';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const templates = await readdir('src/routes/templates');

	return {
		templates: templates.filter((template) => !template.startsWith('+')),
	};
};
