<script context="module" lang="ts">
	export const cdn = 'https://i.guim.co.uk/img/media/';
	import '$templates/components/fonts/Sans.css';
</script>

<script lang="ts">
	import type { GAMVariable } from '$lib/gam';

	import EventsCard from '$templates/components/EventsCard.svelte';
	import EventsHeader from '$templates/components/EventsHeader.svelte';
	import { addTrackingPixel, isValidReplacedVariable } from '$lib/gam';
	import Resizer from '$templates/components/Resizer.svelte';

	export let BrowseAllUrl: GAMVariable;
	export let BannerDescription: GAMVariable;
	export let HeaderButtonText: GAMVariable;
	export let Trackingpixel: GAMVariable;
	export let EventTitle1: GAMVariable;
	export let EventTitle2: GAMVariable;
	export let EventTitle3: GAMVariable;
	export let EventTitle4: GAMVariable;
	export let EventDateTime1: GAMVariable;
	export let EventDateTime2: GAMVariable;
	export let EventDateTime3: GAMVariable;
	export let EventDateTime4: GAMVariable;
	export let EventImage1: GAMVariable;
	export let EventImage2: GAMVariable;
	export let EventImage3: GAMVariable;
	export let EventImage4: GAMVariable;
	export let EventUrl1: GAMVariable;
	export let EventUrl2: GAMVariable;
	export let EventUrl3: GAMVariable;
	export let EventUrl4: GAMVariable;

	if (isValidReplacedVariable(Trackingpixel)) addTrackingPixel(Trackingpixel);

	let height: number = -1;
</script>

<aside bind:clientHeight={height}>
	<EventsHeader
		{BrowseAllUrl}
		{BannerDescription}
		{HeaderButtonText}
	/>
	<div class="cards-container">
		<EventsCard EventTitle={EventTitle1} EventDateTime={EventDateTime1} EventImage={EventImage1} EventUrl={EventUrl1} />
		<EventsCard EventTitle={EventTitle2} EventDateTime={EventDateTime2} EventImage={EventImage2} EventUrl={EventUrl2} />
		<EventsCard EventTitle={EventTitle3} EventDateTime={EventDateTime3} EventImage={EventImage3} EventUrl={EventUrl3} />
		<EventsCard EventTitle={EventTitle4} EventDateTime={EventDateTime4} EventImage={EventImage4} EventUrl={EventUrl4} />
	</div>
</aside>
<Resizer {height} />


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

	.cards-container {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 740px) {
		.cards-container {
			flex-direction: row;
		}
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
