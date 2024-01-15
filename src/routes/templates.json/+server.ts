import { readdir } from 'fs/promises';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export type Templates = Record<'csr' | 'ssr' | 'legacy', string[]>;

export const GET: RequestHandler = async () => {
	const csr = await readdir('src/templates/csr');
	const ssr = await readdir('src/templates/ssr');
	const legacy = (await readdir('legacy/src')).filter(
		(id) => !id.startsWith('_'),
	);

	const body: Templates = {
		csr,
		ssr,
		legacy,
	};

	return json(body);
};
