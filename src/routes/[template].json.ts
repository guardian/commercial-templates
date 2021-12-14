import type { RequestHandler } from '@sveltejs/kit';
import type { RollupCache } from 'rollup';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import alias from '@rollup/plugin-alias';
import preprocess from 'svelte-preprocess';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// import * as internal from "svelte/internal";

const caches: Record<string, RollupCache> = {};

const build = async (template: string): Promise<string> => {
	caches[template]
		? console.info(`Building “${template}” from rollup cache`)
		: console.warn(`Building “${template}” from fresh`);

	const bundle = await rollup({
		input: `src/templates/${template}/index.ts`,
		cache: caches[template],
		plugins: [
			svelte({
				preprocess: preprocess(),
				emitCss: false // TODO, add css plugin for rollup
			}),
			alias({
				entries: [
					{
						find: '$lib',
						replacement: 'src/lib'
					}
				]
			}),
			nodeResolve(),
			// minify the code
			terser()
		]
	});

	const output = await bundle.generate({}).then((output) => output.output[0].code);

	// Cache build for subsequent calls!
	caches[template] = bundle.cache;

	return output;
};

export const get: RequestHandler = async ({ params }) => {
	const { template } = params;

	const js = await build(template);

	return {
		body: {
			html: `<base><div id="svelte"></div><script>${js}</script></base>`,
			css: 'TODO: currently injected via JS'
		}
	};
};
