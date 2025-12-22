<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$props` rune but there's already a variable named props.
     Rename the variable and try again or migrate by hand. -->
<script lang="ts">
	import Code from '$lib/Code.svelte';
	import Previews from '$lib/Previews.svelte';
	import { reloadTemplate } from '$lib/reload';
	import Warning from '$lib/Warning.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const {
		template = '',
		html = '',
		css = '',
		templateProps,
		description,
	} = data;

	reloadTemplate(template);
</script>

<Warning />

<h1>
	SSR Static Template: {template}
</h1>

{@html description}

<Previews {template} {html} {css} {templateProps} />

<Code {html} {css} />
