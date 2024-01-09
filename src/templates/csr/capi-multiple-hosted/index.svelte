<script context="module" lang="ts">
	import '$templates/components/fonts/Sans.css';
	import '$templates/components/fonts/SansBold.css';
</script>

<script lang="ts">
	import {
		isValidReplacedVariable,
		type GAMVariable,
		addTrackingPixel,
	} from '$lib/gam.js';
	import CapiHostedCard from '$templates/components/CapiHostedCard.svelte';
	import HostedHeader from '$templates/components/HostedHeader.svelte';
	import Resizer from '$templates/components/Resizer.svelte';
	import { addOverridesToCardData, retrieveCapiData } from '$lib/capiMultiple';
	import type { CapiCardOverride } from '$lib/types/capi';

	export let SeriesURL: GAMVariable;
	export let BrandLogo: GAMVariable;
	export let BrandColour: GAMVariable;
	export let TrackingId: GAMVariable;
	export let Article1Headline: GAMVariable;
	export let Article1Image: GAMVariable;
	export let Article1URL: GAMVariable;
	export let Article2Headline: GAMVariable;
	export let Article2Image: GAMVariable;
	export let Article2URL: GAMVariable;
	export let Article3Headline: GAMVariable;
	export let Article3Image: GAMVariable;
	export let Article3URL: GAMVariable;
	export let Article4Headline: GAMVariable;
	export let Article4Image: GAMVariable;
	export let Article4URL: GAMVariable;

	let cardOverrides: CapiCardOverride[] = [
		{
			headline: Article1Headline,
			image: Article1Image,
			url: Article1URL,
		},
		{
			headline: Article2Headline,
			image: Article2Image,
			url: Article2URL,
		},
		{
			headline: Article3Headline,
			image: Article3Image,
			url: Article3URL,
		},
		{
			headline: Article4Headline,
			image: Article4Image,
			url: Article4URL,
		},
	];

	const getCards = retrieveCapiData(SeriesURL, cardOverrides).then((response) =>
		addOverridesToCardData(response.articles, cardOverrides, BrandLogo),
	);

	if (isValidReplacedVariable(TrackingId)) addTrackingPixel(TrackingId);

	let height: number = -1;
</script>

<aside bind:clientHeight={height} style="--brand-colour: {BrandColour}">
	{#await getCards}
		<h3>Loading Content...</h3>
	{:then multiple}
		<HostedHeader logo={multiple.logo} />
		<div class="cards-container">
			{#each multiple.cards as card}
				<CapiHostedCard {card} />
			{/each}
		</div>
	{:catch}
		<h3>An error occurred whilst loading content</h3>
	{/await}
</aside>
<Resizer {height} />

<style lang="scss">
	aside {
		max-width: 1300px;
		position: relative;
		display: grid;
		gap: 1em;
		padding: 6px 10px 10px;
		background: #f6f6f6;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
	}

	.cards-container {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 0.5em;
		background: #f6f6f6;
		position: relative;
	}

	@media (min-width: 425px) {
		aside {
			padding: 6px 20px 20px;
		}
		.cards-container {
			grid-template-columns: 1fr 1fr;
			column-gap: 0.5em;
		}
	}

	@media (min-width: 740px) {
		.cards-container {
			grid-template-columns: unset;
			grid-auto-flow: column;
			grid-auto-columns: minmax(0, 1fr);
			gap: 1em;
		}
	}

	@media (min-width: 1140px) {
		aside {
			grid-template-columns: 240px 1fr;
		}
	}
</style>
