<script lang="ts">
	import { retrieveCapiData, addCapiCardOverrides } from '$lib/capiSingle';
	import {
		addTrackingPixel,
		isValidReplacedVariable,
		type GAMVariable,
	} from '$lib/gam';
	import '$templates/components/fonts/Sans.css';
	import CapiCard from '$templates/components/CapiCard.svelte';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';
	import Resizer from '$templates/components/Resizer.svelte';
	import type { CapiCardOverride } from '../../../lib/types/capi';

	export let SeriesUrl: GAMVariable; // IS USED
	export let ComponentTitle: GAMVariable; // IS USED
	// export let CustomUrl: GAMVariable; // IS USED!
	export let ArticleHeadline: GAMVariable; // IS USED
	export let ArticleUrl: GAMVariable; // IS USED
	export let ArticleKicker: GAMVariable; // NOT USED - change to kicker
	export let ArticleText: GAMVariable; // NOT USED - change to kicker
	export let ArticleImage: GAMVariable; // IS USED
	// export let BrandLogo: GAMVariable; // IS USED!
	export let TrackingId: GAMVariable; // IS USED

	let cardOverrides: CapiCardOverride = {
		headline: ArticleHeadline,
		url: ArticleUrl,
		image: ArticleImage,
		kicker: ArticleKicker,
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
		<PaidForHeader
			templateType="single"
			edition={single.branding.edition}
			{ComponentTitle}
			{SeriesUrl}
		/>
		<CapiCard templateType="single" {single} />
	</aside>
	<Resizer {height} />
{:catch}
	<h3>Could not fetch series “{SeriesUrl}”</h3>
{/await}

<style>
	aside {
		background: var(--neutral-97);
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
	}

	h3 {
		background-color: var(--labs-400);
		color: white;
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
