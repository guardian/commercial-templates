import fs from 'fs';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { RequestHandler } from '@sveltejs/kit/types';
import type { ReadCommitResult } from 'isomorphic-git';
import { log } from 'isomorphic-git';
import type { RollupCache } from 'rollup';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';

const caches: Partial<Record<string, RollupCache>> = {};

type Output = {
	code: string;
	commit: ReadCommitResult;
};

const github = 'https://github.com/guardian/commercial-templates/blob';

const filepath = (template: string): `src/templates/${string}/index.ts` =>
	`src/templates/${template}/index.ts`;

const build = async (template: string): Promise<Output> => {
	caches[template]
		? console.info(`Building “${template}” from rollup cache`)
		: console.warn(`Building “${template}” from fresh`);

	const bundle = await rollup({
		input: filepath(template),
		cache: caches[template],
		plugins: [
			svelte({
				preprocess: preprocess(),
				emitCss: false, // TODO, add css plugin for rollup
			}),
			alias({
				entries: [
					{
						find: '$lib',
						replacement: 'src/lib',
					},
				],
			}),
			nodeResolve(),
			// minify the code
			terser(),
		],
	});

	const output = await bundle.generate({}).then((output) => output.output);

	// Cache build for subsequent calls!
	caches[template] = bundle.cache;

	const dir = process.cwd();

	const [commit] = await log({
		fs,
		dir,
		ref: 'HEAD',
		filepath: filepath(template),
		force: true,
	});

	return {
		code: output[0].code,
		commit: commit,
	};
};

export const get: RequestHandler = async ({ params }) => {
	const { template } = params;

	const js = await build(template);
	const props = /props:({.+?})/.exec(js.code)?.[1] ?? '';

	const sha = js.commit.oid.slice(0, 9);
	const link = `${github}/${sha}/${filepath(template)}`;
	const date = new Date(js.commit.commit.author.timestamp * 1_000)
		.toISOString()
		.slice(0, 10);

	const html = [
		`<!-- "${template}" updated on ${date} via ${link} -->`,
		`<div id="svelte" data-template-id="${template}"></div>`,
		`<script>${js.code}</script>`,
	].join('\n');

	return {
		body: {
			html,
			css: 'TODO: currently injected via JS',
			variables: props,
		},
	};
};
