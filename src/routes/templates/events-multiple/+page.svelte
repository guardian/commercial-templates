<script lang="ts">
	import { paletteColours } from '$lib/components/colours/paletteColours';
	import ManualCard from '$lib/components/ManualCard.svelte';
	import ManualHeader from '$lib/components/ManualHeader.svelte';
	import SetHeightResizer from '$lib/components/SetHeightResizer.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const events = $derived.by(() =>
		[
			{
				eventTitle: data.EventTitle1,
				eventDateTime: data.EventDateTime1,
				eventImage: data.EventImage1,
				eventUrl: data.EventUrl1,
			},
			{
				eventTitle: data.EventTitle2,
				eventDateTime: data.EventDateTime2,
				eventImage: data.EventImage2,
				eventUrl: data.EventUrl2,
			},
			{
				eventTitle: data.EventTitle3,
				eventDateTime: data.EventDateTime3,
				eventImage: data.EventImage3,
				eventUrl: data.EventUrl3,
			},
			{
				eventTitle: data.EventTitle4,
				eventDateTime: data.EventDateTime4,
				eventImage: data.EventImage4,
				eventUrl: data.EventUrl4,
			},
		].filter((event) => event.eventTitle !== ''),
	);

	let height = $derived(-1);
</script>

<aside bind:clientHeight={height} style={paletteColours}>
	<ManualHeader
		buttonText={data.HeaderButtonText}
		buttonUrl={data.HeaderButtonUrl}
		tone={'live'}
	>
		{@html data.BannerDescription}
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
	@use '$styles/fonts/Sans';

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
