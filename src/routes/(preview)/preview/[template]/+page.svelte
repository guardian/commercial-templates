<script lang="ts">
	import Previews from '$lib/Previews.svelte';
	import Warning from '$lib/Warning.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ gamVariables, description, template, adJson } = data);
</script>

<Warning />

<h1>
	Template: {template}
</h1>
{#if adJson}
	<div>
		<a
			href={`https://admanager.google.com/59666047#nativeStyles/nativeStyle/detail/${gamVariables?.nativeStyleId}?tab=preview`}
			>Prod Native Style</a
		>
		<br />
		<a
			href={`https://admanager.google.com/59666047#nativeStyles/nativeStyle/detail/${gamVariables?.testNativeStyleId}?tab=preview`}
			>Test Native Style</a
		>
		<br />

		<a
			href={`hhttps://admanager.google.com/59666047#creatives/creative/detail/line_item_id=7228230439&creative_id=${adJson?.testCreativeId}&tab=preview`}
			>Preview in GAM</a
		>
	</div>
{/if}

{@html description}

<Previews {template} {gamVariables} />
