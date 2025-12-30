<script lang="ts">
	import Code from '$lib/Code.svelte';
	import Previews from '$lib/Previews.svelte';
	import Warning from '$lib/Warning.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ defaultProps, description, template, html, css } = data);
</script>

<Warning />

<h1>
	Template: {template}
</h1>

{@html description}

<Previews {template} {defaultProps} />

<Code {html} {css} />
