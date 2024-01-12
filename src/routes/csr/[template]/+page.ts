import { base } from '$app/paths';
import type { Props } from '$lib/svelte';
import type { PageLoad } from './$types';

interface Data {
	template: string;
	html: string;
	props: Props;
	css: string;
	description: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
	const { template } = params;

	const endpoint = `${base}/csr/${template}.json`;
	const json = fetch(endpoint).then((r) => r.json());

	const { html, props, css, description } = await json;

	const data: Data = {
		template,
		html,
		css,
		props,
		description
	};

	return data;
};
