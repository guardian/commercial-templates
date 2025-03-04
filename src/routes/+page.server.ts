import { readdir } from 'fs/promises';
import type { PageServerLoad } from './$types';

export type Templates = Record<'csr' | 'ssr', string[]>;

export const load: PageServerLoad = async () => {
	const csr = await readdir('src/templates/csr');
	const ssr = await readdir('src/templates/ssr');

	return {
		templates: {
			csr,
			ssr,
		},
	};
};
