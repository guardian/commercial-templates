<script lang="ts">
	import Previews from '$lib/Previews.svelte';
	import Warning from '$lib/Warning.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { gamVariables, description, template, adJson } = $derived(data);
</script>

<Warning />

<h1>
	Template: {template}
</h1>
{#if adJson}
	<div>
		<a
			href={`https://admanager.google.com/59666047#creatives/native/native_style/detail/style_id=${adJson?.nativeStyleId}&tab=style_ad`}
			>Prod Native Style</a
		>
		<br />
		<a
			href={`https://admanager.google.com/59666047#creatives/native/native_style/detail/style_id=${adJson?.testNativeStyleId}&tab=style_ad`}
			>Test Native Style</a
		>
		<br />

		<a
			href={`https://admanager.google.com/59666047#creatives/creative/detail/line_item_id=7228230439&creative_id=${adJson?.testCreativeId}&tab=preview`}
			>Preview in GAM</a
		>
	</div>
{/if}

{@html description}

<Previews {template} {gamVariables} />
