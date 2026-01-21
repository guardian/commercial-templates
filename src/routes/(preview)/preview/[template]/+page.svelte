<script lang="ts">
	import Previews from '$lib/Previews.svelte';
	import Warning from '$lib/Warning.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ gamVariables, description, template } = data);
</script>

<Warning />

<h1>
	Template: {template}
</h1>

{@html description}

<Previews {template} {gamVariables} />
