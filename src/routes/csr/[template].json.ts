import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readFileSync,
	writeFileSync,
} from 'fs';
import type { RequestHandler } from '@sveltejs/kit/types';
import { marked } from 'marked';
import { getCommit } from '$lib/git';
import { build } from '$lib/rollup';
import { getProps } from '$lib/svelte';

const github = 'https://github.com/guardian/commercial-templates/blob';

const writeTemplate = (template: string, html: string, css: string) => {
	const outDir = `build-static/${template}`;

	mkdirSync(outDir, { recursive: true });

	writeFileSync(`${outDir}/index.html`, html, 'utf-8');
	writeFileSync(`${outDir}/style.css`, css, 'utf-8');

	const adJSON = `src/templates/csr/${template}/ad.json`;

	if (existsSync(adJSON)) {
		copyFileSync(adJSON, `${outDir}/ad.json`);
	}
};

export const GET: RequestHandler = async ({ params }) => {
	const template = params.template ?? 'unknown';

	const dir = `src/templates/csr/${template}`;
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

	const { styles, chunks } = await build(template, 'dom', gamProps);

	const commit = await getCommit(path);
	const sha = commit?.oid.slice(0, 9) ?? '';
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
		`<div id="svelte" data-template-id="${template}"></div>`,
		`<div id="metrics"></div><style>#metrics{position: fixed; top: 0; left:0; background: #0004; color: white;}</style>`,
		`<script>${String(chunks[0].code)}</script>`,
	].join('\n');

	const css = [`/* ${stamp} */`, styles].join('\n');

	const description = existsSync(`${dir}/README.md`)
		? marked.parse(readFileSync(`${dir}/README.md`, 'utf-8'))
		: `<p><em>no description provided</em></p>`;

	writeTemplate(template, html, css);

	return {
		body: {
			html,
			css,
			props,
			description,
		},
	};
};
