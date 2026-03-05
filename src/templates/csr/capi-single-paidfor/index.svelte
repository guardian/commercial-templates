<script lang="ts">
	import { retrieveCapiData, addCapiCardOverrides } from '$lib/capi';
	import {
		addTrackingPixel,
		isValidReplacedVariable,
		type GAMVariable,
	} from '$lib/gam';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import Resizer from '$templates/components/Resizer.svelte';
	import type { CapiCardOverride } from '$lib/types/capi';
	import '$templates/components/fonts/Sans.css';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';
	import CapiSingleCard from '$templates/components/CapiSingleCard.svelte';
	import Sponsor from '../../components/Sponsor.svelte';

	export let SeriesUrl: GAMVariable;
	export let ComponentTitle: GAMVariable;
	export let ArticleHeadline: GAMVariable;
	export let ArticleText: GAMVariable;
	export let ArticleImage: GAMVariable;
	export let TrackingPixel: GAMVariable;

	let cardOverrides: CapiCardOverride = {
		headline: ArticleHeadline,
		image: ArticleImage,
		text: ArticleText,
	};

	const getCard = retrieveCapiData('single', SeriesUrl).then(
		(response) =>
			addCapiCardOverrides([response], [cardOverrides])[0] || response,
	);

	if (isValidReplacedVariable(TrackingPixel)) addTrackingPixel(TrackingPixel);

	let height: number = -1;
</script>

{#await getCard}
	<h3>Loading Content for “{SeriesUrl}”</h3>
{:then single}
	<aside bind:clientHeight={height} style={paletteColours}>
		<PaidForHeader
			edition={single.branding.edition}
			{ComponentTitle}
			{SeriesUrl}
		/>

		<div class="body">
			<CapiSingleCard {single} />

			<div class="sponsor-container">
				<Sponsor branding={single.branding} />
			</div>
		</div>
	</aside>
	<Resizer {height} />
{:catch}
	<h3>Could not fetch series “{SeriesUrl}”</h3>
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
		padding: 12px 10px 24px;
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

		@media (min-width: 480px) {
			padding: 12px 20px 24px;
		}

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
			display: grid;
			grid-template-columns: 231px 1fr;
			/*
			 * Equivalent of 60px grid column + 20px gap
			 * @todo - replace this with the Guardian grid
			 */
			padding-right: 80px;
		}
	}

	.sponsor-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
</style>
