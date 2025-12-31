<script lang="ts">
	import {
		addCapiHostedCardOverrides,
		retrieveCapiData,
	} from '$lib/capiMultiple';
	import { addTrackingPixel, isValidReplacedVariable } from '$lib/gam.js';
	import type { CapiCardOverride } from '$lib/types/capi';
	import CapiHostedCard from '$lib/components/CapiHostedCard.svelte';
	import type { CapiHostedCard as TCapiHostedCard } from '$lib/types/capi';
	import { paletteColours } from '$lib/components/colours/paletteColours';
	import HostedHeader from '$lib/components/HostedHeader.svelte';
	import Resizer from '$lib/components/Resizer.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let {
		SeriesURL,
		BrandLogo,
		BrandColour,
		TrackingId,
		Article1Headline,
		Article1Image,
		Article1URL,
		Article2Headline,
		Article2Image,
		Article2URL,
		Article3Headline,
		Article3Image,
		Article3URL,
		Article4Headline,
		Article4Image,
		Article4URL,
		numberOfElements,
	} = data;

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

	let cards: TCapiHostedCard[];
	let logo: string | null = null;
	let error: unknown = null;
	let loading = true;

	onMount(async () => {
		try {
			const result = await retrieveCapiData(SeriesURL, cardOverrides).then(
				(response) =>
					addCapiHostedCardOverrides(
						response.articles.slice(0, Number(numberOfElements)),
						cardOverrides,
						BrandLogo,
					),
			);
			({ cards, logo } = result);
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	});

	if (isValidReplacedVariable(TrackingId)) addTrackingPixel(TrackingId);

	$: height = -1;
</script>

<aside
	bind:clientHeight={height}
	style="--brand-colour: {BrandColour}; {paletteColours}"
>
	{#if loading}
		<h3>Loading Content...</h3>
	{:else if error}
		<h3>Could not fetch content</h3>
	{:else}
		<HostedHeader {logo} />
		<div class="cards-container">
			{#each cards as card}
				<CapiHostedCard {card} />
			{/each}
		</div>
	{/if}
</aside>
<Resizer {height} />

<style lang="scss">
	@use '$styles/fonts/Sans';
	@use '$styles/fonts/SansBold';
	aside {
		max-width: 1300px;
		position: relative;
		display: grid;
		gap: 1em;
		padding: 0 10px 10px;
		background: var(--neutral-93);
		border-top: 1px solid var(--brand-colour);
		font-family:
			'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
	}

	.cards-container {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 0.5em;
		background: var(--neutral-97);
		position: relative;
		margin-top: 6px;
	}

	@media (min-width: 425px) {
		aside {
			padding: 0 20px 20px;
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
			grid-template-columns: 140px 1fr;
			gap: 21px;
			margin-right: 10px;
		}
	}

	@media (min-width: 1300px) {
		aside {
			grid-template-columns: 219px 1fr;
			margin-right: 21px;
		}
	}
</style>
