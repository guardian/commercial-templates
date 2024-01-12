import { base } from '$app/paths';
import type { PageLoad } from './$types';
import type { Templates } from './templates.json/+server';

export const load: PageLoad = async ({ fetch }) => {
	const templates: Templates = await fetch(`${base}/templates.json`).then((r) => r.json());

	return {
		templates
	};
};
