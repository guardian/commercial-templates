import fs from 'fs';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { RequestHandler } from '@sveltejs/kit/types';
import { log } from 'isomorphic-git';
import type { RollupCache } from 'rollup';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';

const caches: Partial<Record<string, RollupCache>> = {};

type Output = {
	code: string;
	sha: string;
};

const build = async (template: string): Promise<Output> => {
	caches[template]
		? console.info(`Building “${template}” from rollup cache`)
		: console.warn(`Building “${template}” from fresh`);

	const input = `src/templates/${template}/index.ts`;
	const bundle = await rollup({
		input,
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
		filepath: `src/templates/${template}/index.ts`,
		force: true,
	});

	return {
		code: output[0].code,
		sha: commit.oid,
	};
};

export const get: RequestHandler = async ({ params }) => {
	const { template } = params;

	const js = await build(template);
	const props = /props:({.+?})/.exec(js.code)?.[1] ?? '';

	return {
		body: {
			html: `<!-- https://github.com/guardian/commercial-templates/blob/${js.sha}/src/templates/${template}/index.ts --><div id="svelte" data-template="${template}"></div><script>${js.code}</script>`,
			css: 'TODO: currently injected via JS',
			variables: props,
		},
	};
};
