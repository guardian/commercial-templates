<script lang="ts">
	import Code from '$lib/Code.svelte';
	import Previews from '$lib/Previews.svelte';
	import Warning from '$lib/Warning.svelte';
	import { page } from '$app/state';

	let { data } = $props();

	let { defaultProps, description, template, html, css } = $derived(data);
</script>

<Warning />

<h1>
	Template: {template}
</h1>

{@html description}

<Previews {template} {defaultProps} />

<Code {html} {css} />
