<script lang="ts">
	import { retrieveCapiData, addCapiCardOverrides } from '$lib/capiSingle';
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

	export let SeriesUrl: GAMVariable;
	export let ComponentTitle: GAMVariable;
	export let ArticleHeadline: GAMVariable;
	export let ArticleUrl: GAMVariable;
	export let ArticleText: GAMVariable;
	export let ArticleImage: GAMVariable;
	export let TrackingId: GAMVariable;

	let cardOverrides: CapiCardOverride = {
		headline: ArticleHeadline,
		url: ArticleUrl,
		image: ArticleImage,
		text: ArticleText,
	};

	const getCard = retrieveCapiData(SeriesUrl, cardOverrides).then((response) =>
		addCapiCardOverrides(response, cardOverrides),
	);

	if (isValidReplacedVariable(TrackingId)) addTrackingPixel(TrackingId);

	let height: number = -1;
</script>

{#await getCard}
	<h3>Loading Content for “{SeriesUrl}”</h3>
{:then single}
	<aside bind:clientHeight={height} style={paletteColours}>
		<PaidForHeaderRedesign
			templateType="single"
			edition={single.branding.edition}
			{ComponentTitle}
			{SeriesUrl}
		/>
		<CapiSingleCard {single} />
	</aside>
	<Resizer {height} />
{:catch}
	<h3>Could not fetch series “{SeriesUrl}”</h3>
{/await}

<style>
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
</style>
