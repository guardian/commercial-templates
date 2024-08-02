<script lang="ts">
	import Code from '$lib/Code.svelte';
	import Previews from '$lib/Previews.svelte';
	import { reloadTemplate } from '$lib/reload';
	import Warning from '$lib/Warning.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { template = '', html = '', css = '', props, description } = data;

	reloadTemplate(template);
</script>

<Warning />

<h1>
	SSR Static Template: {template}
</h1>

{@html description}

<Previews {template} {html} {css} {props} />

<Code {html} {css} />
