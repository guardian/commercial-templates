import type { RequestHandler } from '@sveltejs/kit/types';
import { getCommit } from '$lib/git';
import { build, filepath } from '$lib/rollup';
import { getProps } from '$lib/svelte';
import { existsSync } from 'fs';

const github = 'https://github.com/guardian/commercial-templates/blob';

export const get: RequestHandler = async ({ params }) => {
	const template = params.template ?? 'unknown';

	const path = filepath(template, 'csr');

	if (!existsSync(path))
		return {
			body: {
				html: false,
				css: '',
				props: {},
			},
		};

	const propsFallback = getProps(path);

	const { styles, chunks } = await build(template, 'dom', propsFallback);

	const commit = await getCommit(path);
	const sha = commit?.oid.slice(0, 9);
	const link = `${github}/${sha}/${path}`;
	const timestamp = commit?.commit.author.timestamp ?? 0;
	const date = new Date(timestamp * 1_000).toISOString().slice(0, 10);

	const props = {
		...propsFallback,
		...(await import(`../../templates/csr/${template}/test.json`)).default,
	};

	const stamp = `"${template}" updated on ${date} via ${link}`;

	const html = [
		`<!-- ${stamp} -->`,
		`<div id="svelte" data-template-id="${template}"></div>`,
		`<div id="metrics"></div><style>#metrics{position: fixed; top: 0; left:0; background: #0004; color: white;}</style>`,
		`<script>${String(chunks[0].code)}</script>`,
	].join('\n');

	const css = [`/* ${stamp} */`, styles].join('\n');

	return {
		body: {
			html,
			css,
			props,
		},
	};
};
