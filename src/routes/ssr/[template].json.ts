import { existsSync, readFileSync } from 'fs';
import vm from 'vm';
import type { RequestHandler } from '@sveltejs/kit/types';
import { marked } from 'marked';
import type { OutputAsset, OutputChunk } from 'rollup';
import { getCommit } from '$lib/git';
import { build } from '$lib/rollup';
import { getProps } from '$lib/svelte';

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

const isChunk = (output: OutputChunk | OutputAsset): output is OutputChunk =>
	output.type === 'chunk';

export const GET: RequestHandler = async ({ params }) => {
	const template = params.template ?? 'unknown';

	const dir = `src/templates/ssr/${template}`;
	const path = `${dir}/index.svelte`;

	if (!existsSync(path)) {
		return {
			body: {
				html: false,
				css: '',
				props: {},
				description: 'Not found',
			},
		};
	}

	const gamProps = getProps(path);

	const { chunks, styles } = await build(template, 'ssr', gamProps);

	const ssr = prerender(chunks[0].code);

	const js = chunks.filter(isChunk)[1];

	const commit = await getCommit(path);
	const sha = commit?.oid.slice(0, 9) ?? '01010';
	const link = `${github}/${sha}/${path}`;
	const timestamp = commit?.commit.author.timestamp ?? 0;
	const date = new Date(timestamp * 1_000).toISOString().slice(0, 10);

	type FallbackProps = Record<string, string>;
	const fallback = existsSync(`${dir}/test.json`)
		? (JSON.parse(readFileSync(`${dir}/test.json`, 'utf-8')) as FallbackProps)
		: {};

	const props = {
		...gamProps,
		...fallback,
	};

	const stamp = `"${template}" updated on ${date} via ${link}`;

	const html = [
		`<!-- ${stamp} -->`,
		`<div id="svelte" data-template-id="${template}">`,
		ssr.html,
		`</div>`,
		js
			? `<script>${js.code}</script>`
			: `<!-- no src/templates/ssr/${template}/index.ts file -->`,
	].join('\n');

	const css = [`/* ${stamp} */`, String(ssr.css), styles].join('\n');

	const description = existsSync(`${dir}/README.md`)
		? marked.parse(readFileSync(`${dir}/README.md`, 'utf-8'))
		: `<p><em>no description provided</em></p>`;

	return {
		body: {
			html,
			css,
			props,
			description,
		},
	};
};
