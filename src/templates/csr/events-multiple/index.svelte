<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import '$templates/components/fonts/Sans.css';
	import ManualCard from '$templates/components/ManualCard.svelte';
	import EventsHeader from '$templates/components/EventsHeader.svelte';
	import Resizer from '$templates/components/Resizer.svelte';
	import ManualHeader from '$templates/components/ManualHeader.svelte';
	import LiveLogo from '$templates/components/icons/LiveLogo.svelte';

	export let BannerDescription: GAMVariable;
	export let HeaderButtonText: GAMVariable;
	export let HeaderButtonUrl: GAMVariable;
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

	let events = [
		{
			eventTitle: EventTitle1,
			eventDateTime: EventDateTime1,
			eventImage: EventImage1,
			eventUrl: EventUrl1,
		},
		{
			eventTitle: EventTitle2,
			eventDateTime: EventDateTime2,
			eventImage: EventImage2,
			eventUrl: EventUrl2,
		},
		{
			eventTitle: EventTitle3,
			eventDateTime: EventDateTime3,
			eventImage: EventImage3,
			eventUrl: EventUrl3,
		},
		{
			eventTitle: EventTitle4,
			eventDateTime: EventDateTime4,
			eventImage: EventImage4,
			eventUrl: EventUrl4,
		},
	];

	events = events.filter((event) => event.eventTitle !== '');

	let height: number = -1;
</script>

<aside bind:clientHeight={height}>
	<ManualHeader
		buttonText={HeaderButtonText}
		buttonUrl={HeaderButtonUrl}
		backgroundColour="#c83877"
		buttonColour="#ffffff"
	>
		<svelte:fragment slot="logo">
			<LiveLogo />
		</svelte:fragment>
		<svelte:fragment slot="description">
			Our events are a unique opportunity to hear Guardian journalists discuss
			their work, meet our audience and keep the story going.
		</svelte:fragment>
	</ManualHeader>
	<div class="cards-container">
		{#each events as event}
			<ManualCard
				image={event.eventImage}
				url={event.eventUrl}
				callToAction="Book tickets"
				buttonColour="#c83877"
			>
				<svelte:fragment slot="title">
					{@const [boldTitle, regularTitle] = event.eventTitle.split(':')}
					{#if regularTitle}
						<b>{boldTitle}:</b>{regularTitle}
					{:else}
						{boldTitle}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="text">{event.eventDateTime}</svelte:fragment>
			</ManualCard>
		{/each}
	</div>
</aside>
<Resizer {height} />

<style lang="scss">
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
	}

	.cards-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
