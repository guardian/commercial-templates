<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const { template } = params;

		const endpoint = `/csr/${template}.json`;
		const data = fetch(endpoint).then((r) => r.json());

		const { html, props, css } = await data;

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
	import type { Props } from '$lib/svelte';
	import { reloadTemplate } from '$lib/reload';
	import Code from '$lib/Code.svelte';
	import Warning from '$lib/Warning.svelte';
	import Previews from '$lib/Previews.svelte';

	export let template: string;
	export let html: string;
	export let css: string;
	export let props: Props | undefined;

	reloadTemplate(template);
</script>

<Warning />

<h1>
	CSR Dynamic Template: {template}
</h1>

{#if html}
	<Previews {html} {css} {template} {props} />

	<Code {html} {css} />
{:else}
	<div>“{template}” does not exist</div>
{/if}
