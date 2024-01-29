<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import { addTrackingPixel, isValidReplacedVariable } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import CapiCard from '$templates/components/CapiCard.svelte';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';
	import SetHeightResizer from '$templates/components/SetHeightResizer.svelte';

	export const cdn = 'https://i.guim.co.uk/img/media/';
	export const api =
		'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json';
	import '$templates/components/fonts/Sans.css';

	export let SeriesUrl: GAMVariable;
	export let ComponentTitle: GAMVariable;
	export let Trackingpixel: GAMVariable;

	if (isValidReplacedVariable(Trackingpixel)) addTrackingPixel(Trackingpixel);

	const promise = fetch(`${api}?k=${encodeURI(SeriesUrl)}`).then((r) =>
		r.json(),
	) as Promise<Single>;

	let height: number = -1;
</script>

{#await promise}
	<h3>Loading Content for “{SeriesUrl}”</h3>
{:then single}
	<aside bind:clientHeight={height}>
		<PaidForHeader
			templateType="single"
			edition={single.branding.edition}
			{ComponentTitle}
			{SeriesUrl}
		/>
		<CapiCard templateType="single" {single} />
	</aside>
	<SetHeightResizer {height} />
{:catch}
	<h3>Could not fetch series “{SeriesUrl}”</h3>
{/await}

<style>
	aside {
		background: #f6f6f6;
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
		-webkit-font-smoothing: antialiased;
	}

	h3 {
		background-color: #69d1ca;
		color: white;
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
