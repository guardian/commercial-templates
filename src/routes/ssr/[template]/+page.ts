import type { PageLoad } from './$types';
import { base } from '$app/paths';

interface Data {
	template: string;
	html: string;
	css: string;
	props?: Record<string, string>;
	description: string;
}

export const load: PageLoad = async ({ params, fetch }) => {
	const { template } = params;

	const endpoint = `${base}/ssr/${template}.json`;

	const { html, css, props, description } = (await fetch(endpoint).then((r) => r.json())) as Data;

	const data: Data = {
		template,
		html,
		css,
		props,
		description
	};

	return data;
};
