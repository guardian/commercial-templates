import { existsSync, readFileSync } from 'fs';
import { json } from '@sveltejs/kit';
import { marked } from 'marked';
import { getCommit } from '$lib/git';
import { build } from '$lib/rollup';
import type { Props } from '$lib/svelte';
import { getProps } from '$lib/svelte';
import { writeTemplate } from '$lib/write-template';
import type { PageServerLoad } from './$types';

interface Data {
	template: string;
	html: string;
	props: Props;
	css: string;
	description: string;
}

const github = 'https://github.com/guardian/commercial-templates/blob';

const getSupplementalHTML = (template: string) => {
	const path = `src/templates/csr/${template}/index.html`;
	return existsSync(path) ? readFileSync(path, 'utf-8') : null;
};

export const load: PageServerLoad = async ({ params }) => {
	const { template } = params;

	const dir = `src/templates/csr/${template}`;
	const path = `${dir}/index.svelte`;

	if (!existsSync(path)) {
		return json({
			html: false,
			css: '',
			props: {},
			description: 'Not found',
		});
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
		getSupplementalHTML(template) ?? '',
		`<script>${String(chunks[0].code)}</script>`,
	].join('\n');

	const css = [`/* ${stamp} */`, styles].join('\n');

	const description = existsSync(`${dir}/README.md`)
		? await marked.parse(readFileSync(`${dir}/README.md`, 'utf-8'))
		: `<p><em>no description provided</em></p>`;

	writeTemplate(template, 'csr', html, css);

	const data: Data = {
		template,
		html,
		css,
		props,
		description,
	};

	return data;
};
