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

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const cardOverrides: CapiCardOverride[] = $derived.by(() => [
		{
			headline: data.Article1Headline,
			image: data.Article1Image,
			url: data.Article1URL,
		},
		{
			headline: data.Article2Headline,
			image: data.Article2Image,
			url: data.Article2URL,
		},
		{
			headline: data.Article3Headline,
			image: data.Article3Image,
			url: data.Article3URL,
		},
		{
			headline: data.Article4Headline,
			image: data.Article4Image,
			url: data.Article4URL,
		},
	]);

	let cards: TCapiHostedCard[] = $state([]);
	let logo: string | null = $state(null);
	let error: unknown = $state(null);
	let loading = $state(true);

	onMount(async () => {
		if (isValidReplacedVariable(data.TrackingId)) {
			addTrackingPixel(data.TrackingId);
		}

		try {
			const result = await retrieveCapiData(data.SeriesURL, cardOverrides).then(
				(response) =>
					addCapiHostedCardOverrides(
						response.articles.slice(0, Number(data.numberOfElements)),
						cardOverrides,
						data.BrandLogo,
					),
			);
			({ cards, logo } = result);
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	});

	let height = $derived(-1);
	let singleCard = $derived(cards?.length === 1);
</script>

<aside
	bind:clientHeight={height}
	class:singleCard
	style="--brand-colour: {data.BrandColour}; {paletteColours}"
>
	{#if loading}
		<h3>Loading Content...</h3>
	{:else if error}
		<h3>An error occurred whilst loading content</h3>
	{:else}
		<HostedHeader {logo} />
		<div class="cards-container">
			{#each cards as card}
				<CapiHostedCard {card} {singleCard} />
			{/each}
		</div>
	{/if}
</aside>
<Resizer {height} />

<style lang="scss">
	@use '$styles/fonts/Sans';
	@use '$styles/fonts/SansBold';

	:global(body) {
		margin: 0;
	}

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

			.singleCard & {
				grid-template-columns: 1fr;
			}
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
			/*
			 * Equivalent of 60px grid column + 20px gap
			 * @todo - replace this with the Guardian grid
			 */
			margin-right: 80px;
		}
	}
</style>
