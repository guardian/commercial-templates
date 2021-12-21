import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { OutputAsset, OutputChunk, Plugin, RollupCache } from 'rollup';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';

type Props = unknown;

const filepath = (
	template: string,
	mode: 'csr' | 'ssr',
): `src/templates/${typeof mode}/${string}/index.svelte` =>
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
document.querySelector("#metrics").innerText = \`\${measure.duration}ms\`;
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
): Promise<[OutputChunk, ...Array<OutputChunk | OutputAsset>]> => {
	console.info(`Building “${template}” with rollup for ${mode}`);
	const key = template + '--' + mode;
	if (caches[key]) console.info(`caches present for ${key}`);

	const build = await rollup({
		input: mode,
		cache: caches[key],
		plugins: [
			virtual(template, props),
			svelte({
				preprocess: preprocess(),
				emitCss: false, // TODO, add css plugin for rollup
				compilerOptions: {
					generate: mode,
					immutable: mode === 'ssr',
					// hydratable: false,
				},
			}),
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
		],
	});

	// Cache build for subsequent calls!
	caches[key] = build.cache;

	const output = await build.generate({}).then((output) => output.output);

	return output;
};

export { build, filepath };
