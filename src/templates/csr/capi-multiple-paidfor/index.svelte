<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import type { CapiCardOverride } from '$lib/types/capi';
	import '$templates/components/fonts/Sans.css';

	import Sponsor from '$templates/components/Sponsor.svelte';
	import CapiCard from '$templates/components/CapiCard.svelte';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';
	import { addTrackingPixel, isValidReplacedVariable } from '$lib/gam';
	import Resizer from '$templates/components/Resizer.svelte';
	import { retrieveCapiData, addHeadlineKicker } from '$lib/capiMultiple';

	export let SeriesURL: GAMVariable;
	export let ComponentTitle: GAMVariable;
	export let Article1Headline: GAMVariable;
	export let Article1Image: GAMVariable;
	export let Article1URL: GAMVariable;
	export let Article1Kicker: GAMVariable;
	export let Article2Headline: GAMVariable;
	export let Article2Image: GAMVariable;
	export let Article2URL: GAMVariable;
	export let Article2Kicker: GAMVariable;
	export let Article3Headline: GAMVariable;
	export let Article3Image: GAMVariable;
	export let Article3URL: GAMVariable;
	export let Article3Kicker: GAMVariable;
	export let Article4Headline: GAMVariable;
	export let Article4Image: GAMVariable;
	export let Article4URL: GAMVariable;
	export let Article4Kicker: GAMVariable;
	export let Trackingpixel: GAMVariable;

	let cardOverrides: CapiCardOverride[] = [
		{
			headline: Article1Headline,
			image: Article1Image,
			url: Article1URL,
			kicker: Article1Kicker
		},
		{
			headline: Article2Headline,
			image: Article2Image,
			url: Article2URL,
			kicker: Article2Kicker
		},
		{
			headline: Article3Headline,
			image: Article3Image,
			url: Article3URL,
			kicker: Article3Kicker
		},
		{
			headline: Article4Headline,
			image: Article4Image,
			url: Article4URL,
			kicker: Article4Kicker
		}
	];

	const getCards = retrieveCapiData(cardOverrides, SeriesURL).then((response) =>
		addHeadlineKicker(cardOverrides, response.articles)
	);

	if (isValidReplacedVariable(Trackingpixel)) addTrackingPixel(Trackingpixel);

	let height: number = -1;
</script>

{#await getCards}
	<h3>Loading Content for “{SeriesURL}”</h3>
{:then cards}
	{#if cards[0]}
		<aside bind:clientHeight={height}>
			<PaidForHeader
				edition={cards[0].branding.edition}
				{ComponentTitle}
				SeriesUrl={SeriesURL}
				templateType="multiple"
			/>
			<div class="body">
				<div class="cards-container">
					{#each cards as single}
						<CapiCard templateType="multiple" {single} />
					{/each}
				</div>
				<div class="sponsor-container">
					<Sponsor branding={cards[0].branding} templateType="multiple" />
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
	aside {
		background: #ededed;
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
		-webkit-font-smoothing: antialiased;
	}

	.cards-container {
		display: flex;
		flex-direction: column;
		background-color: #ededed;
	}

	.sponsor-container {
		display: flex;
		justify-content: flex-end;
		flex-direction: row;
		height: 90px;
	}

	h3 {
		background-color: #69d1ca;
		color: white;
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

		.body {
			flex-direction: column;
		}
	}
</style>
