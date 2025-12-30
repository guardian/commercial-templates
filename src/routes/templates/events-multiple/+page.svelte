<script lang="ts">
	import '$templates/components/fonts/Sans.css';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import ManualCard from '$templates/components/ManualCard.svelte';
	import ManualHeader from '$templates/components/ManualHeader.svelte';
	import SetHeightResizer from '$templates/components/SetHeightResizer.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let {
		BannerDescription,
		HeaderButtonText,
		HeaderButtonUrl,
		EventTitle1,
		EventTitle2,
		EventTitle3,
		EventTitle4,
		EventDateTime1,
		EventDateTime2,
		EventDateTime3,
		EventDateTime4,
		EventImage1,
		EventImage2,
		EventImage3,
		EventImage4,
		EventUrl1,
		EventUrl2,
		EventUrl3,
		EventUrl4,
	} = data;

	let events = $state([
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
	]);

	events = events.filter((event) => event.eventTitle !== '');

	let height: number = $state(-1);
</script>

<aside bind:clientHeight={height} style={paletteColours}>
	<ManualHeader
		buttonText={HeaderButtonText}
		buttonUrl={HeaderButtonUrl}
		tone={'live'}
	>
		{@html BannerDescription}
	</ManualHeader>
	<div class="cards-container">
		{#each events as event}
			<ManualCard
				image={event.eventImage}
				url={event.eventUrl}
				linkText="Book tickets"
				tone={'live'}
			>
				{#snippet title()}
					{@const [boldTitle, regularTitle] = event.eventTitle.split(':')}
					{#if regularTitle}
						<b>{@html boldTitle}:</b>{@html regularTitle}
					{:else}
						{@html boldTitle}
					{/if}
				{/snippet}
				{#snippet text()}
					{event.eventDateTime}
				{/snippet}
			</ManualCard>
		{/each}
	</div>
</aside>
<SetHeightResizer {height} />

<style lang="scss">
	aside {
		background: var(--neutral-97);
		position: relative;
		display: flex;
		flex-direction: column;
		font-family:
			'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
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
