import vm from 'vm';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { RequestHandler } from '@sveltejs/kit/types';
import { rollup } from 'rollup';
import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { getCommit, virtual } from '../[template].json';

type Output = {
	html?: string;
	js?: string;
	css?: string;
};

const github = 'https://github.com/guardian/commercial-templates/blob';

const filepath = (template: string): `src/templates/${string}/index.ts` =>
	`src/templates/${template}/index.ts`;

const build = async (template: string, ssr: boolean): Promise<Output> => {
	const bundle = await rollup({
		input: 'ssr',
		cache: false,
		plugins: [
			virtual(template, {}),
			svelte({
				preprocess: preprocess(),
				emitCss: false, // TODO, add css plugin for rollup
				compilerOptions: {
					generate: 'ssr',
					immutable: true,
					hydratable: true,
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
		],
	});

	const output = await bundle.generate({}).then((output) => output.output);

	console.log(output);

	if (ssr) {
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
		vm.runInContext(output[0].code, ctx);

		return {
			// @ts-expect-error -- it’s happening in the vm
			html: share.html,
			// @ts-expect-error -- it’s happening in the vm
			css: share.css.code,
		};
	}

	return {
		js: output[0].code,
	};
};

export const get: RequestHandler = async ({ params }) => {
	const template = params.ssrTemplate;

	const server = await build(template, true);

	const commit = await getCommit(filepath(template));
	const sha = commit.oid.slice(0, 9);
	const link = `${github}/${sha}/${filepath(template)}`;
	const date = new Date(commit.commit.author.timestamp * 1_000)
		.toISOString()
		.slice(0, 10);

	const html = [
		`<!-- "${template}" updated on ${date} via ${link} -->`,
		`<div id="svelte" data-template-id="${template}">`,
		server.html,
		`</div>`,
		`<style>${String(server.css)}</style>`,
	].join('\n');

	return {
		body: {
			html,
			css: 'TODO: currently injected via JS',
		},
	};
};
