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
	import PaidForHeaderRedesign from '$templates/components/PaidForHeaderRedesign.svelte';
	import CapiSingleCard from '$templates/components/CapiSingleCard.svelte';
	import SponsorRedesign from '../../components/SponsorRedesign.svelte';

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
		<PaidForHeaderRedesign
			edition={single.branding.edition}
			{ComponentTitle}
			{SeriesUrl}
		/>

		<div class="body">
			<CapiSingleCard {single} />

			<div class="sponsor-container">
				<SponsorRedesign branding={single.branding} />
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
		}
	}

	.sponsor-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
</style>
