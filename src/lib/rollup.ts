import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { Plugin, RollupCache, RollupOutput } from 'rollup';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import cssOnly from 'rollup-plugin-css-only';

type Props = unknown;

const filepath = <Mode extends 'csr' | 'ssr', Template extends string>(
	template: Template,
	mode: Mode,
): `src/templates/${Mode}/${Template}/index.svelte` =>
	`src/templates/${mode}/${template}/index.svelte`;

const virtual = (template: string, props: Props): Plugin => ({
	name: 'virtual-template',
	resolveId: (source: string) => {
		if (source === 'ssr' || source === 'dom') return source;
		return null;
	},
	load: (id: string) => {
		if (id === 'ssr') {
			return [
				`import Template from "./${filepath(template, 'ssr')}"`,
				`setShare(Template.render(${JSON.stringify(props)}))`,
			].join('\n');
		}
		if (id === 'dom') {
			return `import Template from "./${filepath(template, 'csr')}";
window.performance.mark('svelteStart');
new Template({
	target: document.querySelector('#svelte'),
	props: ${JSON.stringify(props)},
});
window.performance.mark('svelteEnd');
const measure = window.performance.measure('svelte', 'svelteStart','svelteEnd');
document.querySelector("#metrics").innerText = \`\${measure.duration.toFixed(2)}ms\`;
`;
		}
		return null;
	},
});

const caches: Partial<Record<string, RollupCache>> = {};
const build = async (
	template: string,
	mode: 'ssr' | 'dom',
	props?: Props,
): Promise<{
	styles: string;
	chunks: RollupOutput['output'];
}> => {
	console.info(`Building “${template}” with rollup for ${mode}`);
	const key = template + '--' + mode;
	if (caches[key]) console.info(`caches present for ${key}`);

	let styles: string = '';

	const build = await rollup({
		input: mode,
		cache: caches[key],
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
			// minify the code
			mode === 'dom' && terser(),
			cssOnly({
				output: (processedStyles: string) => {
					styles = processedStyles
						.replaceAll(/\s+/g, ' ')
						.replaceAll('\t', ' ');
					return false;
				},
			}),
		],
	});

	// Cache build for subsequent calls!
	// caches[key] = build.cache;

	const output = await build.generate({}).then((output) => output.output);

	return { styles, chunks: output };
};

export { build, filepath };
