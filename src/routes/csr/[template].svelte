<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { base } from '$app/paths';

	export const load: Load = async ({ fetch, params }) => {
		const { template } = params;

		const endpoint = `${base}/csr/${template}.json`;
		const data = fetch(endpoint).then((r) => r.json());

		const { html, props, css, description } = await data;

		return {
			props: {
				template,
				html,
				css,
				props,
				description,
			},
		};
	};
</script>

<script lang="ts">
	import type { Props } from '$lib/svelte';
	import { reloadTemplate } from '$lib/reload';
	import Code from '$lib/Code.svelte';
	import Warning from '$lib/Warning.svelte';
	import Previews from '$lib/Previews.svelte';

	export let template: string;
	export let html: string;
	export let css: string;
	export let props: Props | undefined;
	export let description: string;

	reloadTemplate(template);
</script>

<Warning />

<h1>
	CSR Dynamic Template: {template}
</h1>

{@html description}

{#if html}
	<Previews {html} {css} {template} {props} />

	<Code {html} {css} />
{:else}
	<div>“{template}” does not exist</div>
{/if}
