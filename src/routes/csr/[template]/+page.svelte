<script lang="ts">
	import { reloadTemplate } from '$lib/reload';
	import Code from '$lib/Code.svelte';
	import Warning from '$lib/Warning.svelte';
	import Previews from '$lib/Previews.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let { template, html, css, props, description } = data;

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
