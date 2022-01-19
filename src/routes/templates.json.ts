import { readdir } from 'fs/promises';
import type { RequestHandler } from '@sveltejs/kit/types';

export type Templates = Record<'csr' | 'ssr', string[]>;

export const get: RequestHandler = async () => {
	const csr = await readdir('src/templates/csr');
	const ssr = await readdir('src/templates/ssr');

	const body: Templates = {
		csr,
		ssr,
	};

	return {
		body,
	};
};
