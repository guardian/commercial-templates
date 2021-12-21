import type { RequestHandler } from '@sveltejs/kit/types';
import { getCommit } from '$lib/git';
import { build, filepath } from '$lib/rollup';
import { getProps } from '$lib/svelte';

const github = 'https://github.com/guardian/commercial-templates/blob';

export const get: RequestHandler = async ({ params }) => {
	const { template } = params;

	const path = filepath(template, 'csr');

	const propsFallback = getProps(path);

	const output = await build(template, 'dom', propsFallback);

	const commit = await getCommit(path);
	const sha = commit?.oid.slice(0, 9);
	const link = `${github}/${sha}/${path}`;
	const timestamp = commit?.commit.author.timestamp ?? 0;
	const date = new Date(timestamp * 1_000).toISOString().slice(0, 10);

	const props = {
		...propsFallback,
		...(await import(`../../templates/csr/${template}/test.json`)).default,
	};

	const html = [
		`<!-- "${template}" updated on ${date} via ${link} -->`,
		`<div id="svelte" data-template-id="${template}"></div>`,
		`<div id="metrics"></div>`,
		`<script>${String(output[0].code)}</script>`,
	].join('\n');

	return {
		body: {
			html,
			css: 'TODO: currently injected via JS',
			props,
		},
	};
};
