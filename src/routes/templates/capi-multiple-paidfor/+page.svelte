<script lang="ts">
	import { addCapiCardOverrides, retrieveCapiData } from '$lib/capi';
	import { addTrackingPixel, isValidReplacedVariable } from '$lib/gam';
	import type { CapiCardOverride } from '$lib/types/capi';
	import '$templates/components/fonts/Sans.css';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';
	import Resizer from '$templates/components/Resizer.svelte';
	import CapiMultipleCard from '$templates/components/CapiMultipleCard.svelte';
	import Sponsor from '$templates/components/Sponsor.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let {
		SeriesURL,
		ComponentTitle,
		Article1Headline,
		Article1Image,
		Article1Kicker,
		Article2Headline,
		Article2Image,
		Article2Kicker,
		Article3Headline,
		Article3Image,
		Article3Kicker,
		Article4Headline,
		Article4Image,
		Article4Kicker,
		TrackingPixel,
	} = data;

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

	let height: number = $state(-1);
</script>

{#await getCards}
	<h3>Loading Content for “{SeriesURL}”</h3>
{:then cards}
	{#if cards[0]}
		<aside bind:clientHeight={height} style={paletteColours}>
			<PaidForHeader
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
					<Sponsor branding={cards[0].branding} />
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
		margin: auto;
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

		max-width: 740px;

		@media (min-width: 980px) {
			max-width: 980px;
		}

		@media (min-width: 1140px) {
			max-width: 1140px;
			display: grid;
			grid-template-columns: 151px 1fr;
		}

		@media (min-width: 1300px) {
			max-width: 1300px;
			grid-template-columns: 211px 1fr;
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
