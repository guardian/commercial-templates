import vm from 'vm';
import type { RequestHandler } from '@sveltejs/kit/types';
import { getCommit } from '$lib/git';
import { build, filepath } from '$lib/rollup';

type Output = {
	html?: string;
	js?: string;
	css?: string;
};

const github = 'https://github.com/guardian/commercial-templates/blob';

const prerender = (code: string): Output => {
	type Share = {
		html: string;
		css: {
			code: string;
		};
	};
	let share: Share;
	const setShare = (replace: Share) => {
		share = replace;
	};
	const ctx = vm.createContext({ setShare });
	vm.runInContext(code, ctx);

	return {
		// @ts-expect-error -- it’s happening in the vm
		html: share.html,
		// @ts-expect-error -- it’s happening in the vm
		css: share.css.code,
	};
};

export const get: RequestHandler = async ({ params }) => {
	const { template } = params;

	const path = filepath(template, 'ssr');

	const output = await build(template, 'ssr');

	// TODO: Pass props to render an initial value
	const ssr = prerender(output[0].code);

	const commit = await getCommit(path);
	const sha = commit?.oid.slice(0, 9) ?? '01010';
	const link = `${github}/${sha}/${path}`;
	const timestamp = commit?.commit.author.timestamp ?? 0;
	const date = new Date(timestamp * 1_000).toISOString().slice(0, 10);

	const html = [
		`<!-- "${template}" updated on ${date} via ${link} -->`,
		`<div id="svelte" data-template-id="${template}">`,
		ssr.html,
		`</div>`,
		// TODO: add JS from index.ts
	].join('\n');

	return {
		body: {
			html,
			css: String(ssr.css),
		},
	};
};
