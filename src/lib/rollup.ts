import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { Plugin, RollupOutput } from 'rollup';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import type { Props } from './svelte';

const performancescript = `window.performance.mark('svelteEnd');
const measure = window.performance.measure('svelte', 'svelteStart','svelteEnd');
document.querySelector("#metrics").innerText = \`\${measure.duration.toFixed(2)}ms\`;`;

const measureSveltePerf = true;

const virtual = (template: string, props: Props): Plugin => ({
	name: 'virtual-template',
	resolveId: (source: string) => {
		if (source === 'ssr' || source === 'dom') return source;
		return null;
	},
	load: (id: string) => {
		if (id === 'ssr') {
			return [
				`import Template from "./src/templates/ssr/${template}/index.svelte"`,
				`setShare(Template.render(${JSON.stringify(props)}))`,
			].join('\n');
		}
		if (id === 'dom') {
			return `import Template from "./src/templates/csr/${template}/index.svelte";
window.performance.mark('svelteStart');
new Template({
	target: document.querySelector('#svelte'),
	props: ${JSON.stringify(props)},
});${measureSveltePerf && performancescript}`;
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
	mode: 'ssr' | 'dom',
	props: Props = {},
): Promise<{
	styles: string;
	chunks: RollupOutput['output'];
}> => {
	console.info(
		`Building ${
			mode === 'dom' ? 'Dynamic' : 'Static'
		} template “${template}”`,
	);

	let styles: string = '';

	const input: ['dom'] | ['ssr', `${string}/index.ts`] =
		mode === 'dom'
			? ['dom']
			: ['ssr', `src/templates/ssr/${template}/index.ts`];

	const build = await rollup({
		input,
		plugins: [
			virtual(template, props),
			svelte({
				preprocess: preprocess(),
				emitCss: mode === 'dom',
				compilerOptions: {
					generate: mode,
					immutable: true,
				},
			}),
			typescript({ sourceMap: false }),
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
			// @ts-expect-error -- the community types are not so great
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
