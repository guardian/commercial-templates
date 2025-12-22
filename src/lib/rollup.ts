import fs from 'fs';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import type { Plugin, RollupOutput } from 'rollup';
import { rollup } from 'rollup';
import css from 'rollup-plugin-css-only';
import svelte from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import type { Props } from './svelte';

const virtual = (template: string, props: Props): Plugin => ({
	name: 'virtual-template',
	resolveId(source: string) {
		if (source === 'ssr' || source === 'dom') {
			return source;
		}
		return null;
	},
	load(id: string) {
		if (id === 'ssr') {
			return [
				`import Template from "./src/templates/ssr/${template}/index.svelte"`,
				`setShare(Template.render(${JSON.stringify(props)}))`,
			].join('\n');
		}
		if (id === 'dom') {
			return `import Template from "./src/templates/csr/${template}/index.svelte";
new Template({
	target: document.querySelector('#svelte'),
	props: ${JSON.stringify(props)},
});`;
		}
		return null;
	},
});

/**
 * Builds and minifies the JS & CSS from the svelte templates using Rollup.
 *
 * @param template the `id` of the template, matching its directory name.
 * @param mode `dom` for dynamic templates, `ssr` for static ones.
 * @param props GAM variables used to build the template.
 * @returns Rollup chunks of the compiled JS & CSS.
 */
const build = async (
	template: string,
	mode: 'server' | 'client',
	props: Props = {},
): Promise<{
	styles: string;
	chunks: RollupOutput['output'];
}> => {
	console.info(
		`Building ${mode === 'client' ? 'Dynamic' : 'Static'} template “${template}”`,
	);

	let styles = '';

	let input: ['server' | 'client'] | ['server', `${string}/index.ts`] = [mode];

	if (mode === 'server') {
		if (fs.existsSync(`src/templates/ssr/${template}/index.ts`)) {
			input = ['server', `src/templates/ssr/${template}/index.ts`];
		}
	}

	const build = await rollup({
		input,
		plugins: [
			virtual(template, props),
			svelte({
				preprocess: sveltePreprocess(),
				emitCss: mode === 'client',
				compilerOptions: {
					generate: mode,
					immutable: true,
				},
			}),
			typescript({ sourceMap: false }),
			commonjs(),
			alias({
				entries: [
					{
						find: '$lib',
						replacement: 'src/lib',
					},
					{
						find: '$templates',
						replacement: 'src/templates',
					},
				],
			}),
			nodeResolve(),
			terser(),
			css({
				output: (processedStyles: string) => {
					styles = processedStyles
						.replaceAll(/\s+/g, ' ')
						.replaceAll('\t', ' ');
					return false;
				},
			}),
		],
	});

	const output = await build.generate({}).then((output) => output.output);

	return { styles, chunks: output };
};

export { build };
