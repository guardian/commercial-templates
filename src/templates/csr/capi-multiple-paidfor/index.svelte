<script context="module" lang="ts">
	export const cdn = 'https://i.guim.co.uk/img/media/';
	export const api =
		'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';
	import '$templates/components/fonts/Sans.css';
</script>

<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import type { CapiCardOverride } from '$lib/types/capi';

	import Sponsor from '$templates/components/Sponsor.svelte';
	import CapiCard from '$templates/components/CapiCard.svelte';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';
	import { addTrackingPixel, isValidReplacedVariable } from '$lib/gam';
	import Resizer from '$templates/components/Resizer.svelte';
	import { retrieveCapiData, addHeadlineKicker } from '$lib/capiMultiple';

	export let SeriesUrl: GAMVariable;
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

	let cards: CapiCardOverride[] = [
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
		},
	];

	const requestData = retrieveCapiData(cards, SeriesUrl)

	if (isValidReplacedVariable(Trackingpixel)) addTrackingPixel(Trackingpixel);

	let height: number = -1;
</script>

{#await requestData}
	<h3>Loading Content for “{SeriesUrl}”</h3>
{:then response}
	{#await addHeadlineKicker(cards, response.articles)}
		<p>Formatting cards...</p>
	{:then formattedCards}
		<aside bind:clientHeight={height}>
			<PaidForHeader
				edition={response.articles[0].branding.edition}
				{ComponentTitle}
				{SeriesUrl}
				templateType='multiple'
			/>
				<div class="body">
					<div class="cards-container">
						{#each formattedCards as single}
							<CapiCard templateType='multiple' {single} />
						{/each}
					</div>
					<div class="sponsor-container">
						<Sponsor branding={response.articles[0].branding} templateType ='multiple' />
					</div>
				</div>
		</aside>
		<Resizer {height} />
	{/await}
{:catch}
	<h3>Could not fetch series “{SeriesUrl}”</h3>
{/await}

<style>
	aside {
		background: #ededed;
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
