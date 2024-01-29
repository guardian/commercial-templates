import { readdir } from 'fs/promises';
import type { PageServerLoad } from './$types';

export type Templates = Record<'csr' | 'ssr' | 'legacy', string[]>;

export const load: PageServerLoad = async () => {
	const csr = await readdir('src/templates/csr');
	const ssr = await readdir('src/templates/ssr');
	const legacy = (await readdir('legacy/src')).filter(
		(id) => !id.startsWith('_'),
	);

	return {
		templates: {
			csr,
			ssr,
			legacy,
		},
	};
};
