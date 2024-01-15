import type { PageLoad } from './$types';
import type { Templates } from './templates.json/+server';
import { base } from '$app/paths';

export const load: PageLoad = async ({ fetch }) => {
	const templates = (await fetch(`${base}/templates.json`).then((r) =>
		r.json(),
	)) as Templates;

	return {
		templates,
	};
};
