<!-- @migration-task Error while migrating Svelte code: Encountered an export declaration pattern that is not supported for automigration. -->
<script lang="ts">
	import Code from '$lib/Code.svelte';
	import Previews from '$lib/Previews.svelte';
	import { reloadTemplate } from '$lib/reload';
	import Warning from '$lib/Warning.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let { template = '', html, css = '', props, description } = data;

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
