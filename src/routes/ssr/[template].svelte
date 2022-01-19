<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const { template } = params;

		const endpoint = `/ssr/${template}.json`;

		const { html, css, props } = await fetch(endpoint).then((r) =>
			r.json(),
		);

		return {
			props: {
				template,
				html,
				css,
				props,
			},
		};
	};
</script>

<script lang="ts">
	import { reloadTemplate } from '$lib/reload';
	import Code from '$lib/Code.svelte';
	import Warning from '$lib/Warning.svelte';
	import Previews from '$lib/Previews.svelte';

	export let template: string;
	export let html: string;
	export let css: string;
	export let props: Record<string, string> | undefined;

	reloadTemplate(template);
</script>

<Warning />

<h1>
	SSR Static Template: {template}
</h1>

<Previews {template} {html} {css} {props} />

<Code {html} {css} />
