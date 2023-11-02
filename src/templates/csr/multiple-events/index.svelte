<script context="module" lang="ts">
	export const cdn = 'https://i.guim.co.uk/img/media/';
	import '$templates/components/fonts/Sans.css';
</script>

<script lang="ts">
	import type { GAMVariable } from '$lib/gam';

	import ManualCard from '$templates/components/ManualCard.svelte';
	import EventsHeader from '$templates/components/EventsHeader.svelte';
	import Resizer from '$templates/components/Resizer.svelte';

	export let BrowseAllUrl: GAMVariable;
	export let BannerDescription: GAMVariable;
	export let HeaderButtonText: GAMVariable;
	export let NumberOfCards: GAMVariable;
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

	let events = [{
		eventTitle: EventTitle1,
		eventDateTime: EventDateTime1,
		eventImage: EventImage1,
		eventUrl: EventUrl1
	},
	{
		eventTitle: EventTitle2,
		eventDateTime: EventDateTime2,
		eventImage: EventImage2,
		eventUrl: EventUrl2
	},
	{
		eventTitle: EventTitle3,
		eventDateTime: EventDateTime3,
		eventImage: EventImage3,
		eventUrl: EventUrl3
	},
	{
		eventTitle: EventTitle4,
		eventDateTime: EventDateTime4,
		eventImage: EventImage4,
		eventUrl: EventUrl4
	}]

	let height: number = -1;
</script>

<aside bind:clientHeight={height}>
	<EventsHeader
		{BrowseAllUrl}
		{BannerDescription}
		{HeaderButtonText}
	/>
	<div class="cards-container">
		{#each {length: NumberOfCards} as _, i}
			<ManualCard TotalCardNumber={NumberOfCards} CardNumber={i+1} EventTitle={events[i].eventTitle} EventDateTime={events[i].eventDateTime} EventImage={events[i].eventImage} EventUrl={events[i].eventUrl} />
		{/each}
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
		flex-direction: row;
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
