<script lang="ts">
	import { addCapiCardOverrides, retrieveCapiData } from '$lib/capi';
	import {
		addTrackingPixel,
		type GAMVariable,
		isValidReplacedVariable,
	} from '$lib/gam';
	import type { CapiCardOverride } from '$lib/types/capi';
	import '$templates/components/fonts/Sans.css';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import PaidForHeaderRedesign from '$templates/components/PaidForHeaderRedesign.svelte';
	import Resizer from '$templates/components/Resizer.svelte';
	import CapiMultipleCard from '$templates/components/CapiMultipleCard.svelte';
	import SponsorRedesign from '$templates/components/SponsorRedesign.svelte';

	export let SeriesURL: GAMVariable;
	export let ComponentTitle: GAMVariable;
	export let Article1Headline: GAMVariable;
	export let Article1Image: GAMVariable;
	export let Article1Kicker: GAMVariable;
	export let Article2Headline: GAMVariable;
	export let Article2Image: GAMVariable;
	export let Article2Kicker: GAMVariable;
	export let Article3Headline: GAMVariable;
	export let Article3Image: GAMVariable;
	export let Article3Kicker: GAMVariable;
	export let Article4Headline: GAMVariable;
	export let Article4Image: GAMVariable;
	export let Article4Kicker: GAMVariable;
	export let TrackingPixel: GAMVariable;

	let cardOverrides: CapiCardOverride[] = [
		{
			headline: Article1Headline,
			image: Article1Image,
			kicker: Article1Kicker,
		},
		{
			headline: Article2Headline,
			image: Article2Image,
			kicker: Article2Kicker,
		},
		{
			headline: Article3Headline,
			image: Article3Image,
			kicker: Article3Kicker,
		},
		{
			headline: Article4Headline,
			image: Article4Image,
			kicker: Article4Kicker,
		},
	];

	const getCards = retrieveCapiData('multiple', SeriesURL).then((response) =>
		addCapiCardOverrides(response.articles, cardOverrides),
	);

	if (isValidReplacedVariable(TrackingPixel)) addTrackingPixel(TrackingPixel);

	let height: number = -1;
</script>

{#await getCards}
	<h3>Loading Content for “{SeriesURL}”</h3>
{:then cards}
	{#if cards[0]}
		<aside bind:clientHeight={height} style={paletteColours}>
			<PaidForHeaderRedesign
				edition={cards[0].branding.edition}
				{ComponentTitle}
				SeriesUrl={SeriesURL}
			/>

			<div class="body">
				<div class="cards-container">
					{#each cards as single}
						<CapiMultipleCard {single} />
					{/each}
				</div>
				<div class="sponsor-container">
					<SponsorRedesign branding={cards[0].branding} />
				</div>
			</div>
		</aside>
		<Resizer {height} />
	{/if}
{:catch}
	<h3>Could not fetch series “{SeriesURL}”</h3>
{/await}

<style>
	:global(body) {
		margin: 0;
	}

	div {
		width: auto;
	}
	aside {
		padding: 12px;
		background: var(--neutral-100);
		position: relative;
		display: flex;
		flex-direction: column;
		font-family:
			'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
		-webkit-font-smoothing: antialiased;

		@media (min-width: 1140px) {
			display: grid;
			grid-template-columns: 151px 1fr;
		}

		@media (min-width: 1300px) {
			grid-template-columns: 211px 1fr;
			gap: 12px;
		}
	}

	.cards-container {
		display: flex;
		flex-direction: column;
		column-gap: 20px;

		background-color: var(--neutral-100);
		/** Needed to absolutely position the horizontal rule between each CapiCard */
		position: relative;

		@media (min-width: 740px) {
			flex-direction: row;
		}
		@media (min-width: 1140px) {
			margin-left: 10px;
		}
	}

	.sponsor-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
</style>
