import { readdir } from 'fs/promises';
import type { RequestHandler } from '@sveltejs/kit/types';

export type Templates = Record<'csr' | 'ssr' | 'legacy', string[]>;

export const get: RequestHandler = async () => {
	const csr = await readdir('src/templates/csr');
	const ssr = await readdir('src/templates/ssr');
	const legacy = await (
		await readdir('legacy/src')
	).filter((id) => !id.startsWith('_'));

	const body: Templates = {
		csr,
		ssr,
		legacy,
	};

	return {
		body,
	};
};
