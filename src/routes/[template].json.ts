import fs from 'fs';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { RequestHandler } from '@sveltejs/kit/types';
import type { ReadCommitResult } from 'isomorphic-git';
import { log } from 'isomorphic-git';
import type { Plugin, RollupCache } from 'rollup';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import compiler from 'svelte/compiler';

const caches: Partial<Record<string, RollupCache>> = {};
type Output = {
	js: string;
	css: string;
	props: Record<string, `[%${string}%]`>;
};

const github = 'https://github.com/guardian/commercial-templates/blob';

const filepath = (template: string): `src/templates/${string}/index.svelte` =>
	`src/templates/${template}/index.svelte`;

const virtual = (template: string, props: Output['props']): Plugin => ({
	name: 'virtual-template',
	resolveId: (source: string) => {
		if (source === 'ssr' || source === 'dom') return source;
		return null;
	},
	load: (id: string) => {
		if (id === 'ssr') {
			return [
				`import Template from "./${filepath(template)}"`,
				`setShare(Template.render(${JSON.stringify(props)}))`,
			].join('\n');
		}
		if (id === 'dom') {
			return `import Template from "./${filepath(template)}";
new Template({
	target: document.querySelector('#svelte'),
	props: ${JSON.stringify(props)},
});`;
		}
		return null;
	},
});

const getCommit = async (filepath: string): Promise<ReadCommitResult> => {
	const dir = process.cwd();

	const [commit] = await log({
		fs,
		dir,
		ref: 'HEAD',
		filepath,
		force: true,
	});

	return commit;
};

const build = async (template: string): Promise<Output> => {
	caches[template]
		? console.info(`Building “${template}” from rollup cache`)
		: console.warn(`Building “${template}” from fresh`);

	const { vars } = compiler.compile(
		// TODO: handle Typescript, too
		fs.readFileSync(filepath(template), 'utf8'),
		{},
	);

	const props: Output['props'] = vars
		.filter((v) => v.writable)
		.map((v) => v.name)
		.reduce((o, key) => {
			o[key] = `[%${key}%]`;
			return o;
		}, {});

	const bundle = await rollup({
		input: 'dom',
		cache: caches[template],
		plugins: [
			virtual(template, props),
			svelte({
				preprocess: preprocess(),
				emitCss: false, // TODO, add css plugin for rollup
				compilerOptions: {
					generate: 'dom',
					immutable: true,
					hydratable: false,
				},
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

	return {
		js: output[0].code,
		css: 'TBC',
		props,
	};
};

export const get: RequestHandler = async ({ params }) => {
	const { template } = params;

	const client = await build(template);

	const commit = await getCommit(filepath(template));
	const sha = commit.oid.slice(0, 9);
	const link = `${github}/${sha}/${filepath(template)}`;
	const date = new Date(commit.commit.author.timestamp * 1_000)
		.toISOString()
		.slice(0, 10);

	const html = [
		`<!-- "${template}" updated on ${date} via ${link} -->`,
		`<div id="svelte" data-template-id="${template}">`,
		`</div>`,
		`<script>${String(client.js)}</script>`,
	].join('\n');

	return {
		body: {
			html,
			css: 'TODO: currently injected via JS',
			props: client.props,
		},
	};
};

export { getCommit, virtual };
