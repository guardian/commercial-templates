<script lang="ts">
	import { retrieveCapiData, addCapiCardOverrides } from '$lib/capi';
	import { addTrackingPixel, isValidReplacedVariable } from '$lib/gam';
	import { paletteColours } from '$lib/components/colours/paletteColours';
	import Resizer from '$lib/components/Resizer.svelte';
	import type { CapiCardOverride, Single } from '$lib/types/capi';
	import PaidForHeader from '$lib/components/PaidForHeader.svelte';
	import CapiSingleCard from '$lib/components/CapiSingleCard.svelte';
	import Sponsor from '$lib/components/Sponsor.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let {
		SeriesUrl,
		ComponentTitle,
		ArticleHeadline,
		ArticleText,
		ArticleImage,
		TrackingPixel,
	} = data;

	let cardOverrides: CapiCardOverride = {
		headline: ArticleHeadline,
		image: ArticleImage,
		text: ArticleText,
	};

	let card: Single;
	let error: unknown = null;
	let loading = true;

	onMount(async () => {
		try {
			card = await retrieveCapiData('single', SeriesUrl).then(
				(response) =>
					addCapiCardOverrides([response], [cardOverrides])[0] || response,
			);
		} catch (err) {
			error = err;
		} finally {
			loading = false;
		}
	});

	if (isValidReplacedVariable(TrackingPixel)) addTrackingPixel(TrackingPixel);

	$: height = -1;
</script>

{#if loading}
	<h3>Loading Content for "{SeriesUrl}"</h3>
{:else if error}
	<h3>Could not fetch series "{SeriesUrl}"</h3>
{:else}
	<aside bind:clientHeight={height} style={paletteColours}>
		<PaidForHeader
			edition={card.branding.edition}
			{ComponentTitle}
			{SeriesUrl}
		/>
		<div class="body">
			<CapiSingleCard single={card} />
			<div class="sponsor-container">
				<Sponsor branding={card.branding} />
			</div>
		</div>
	</aside>
	<Resizer {height} />
{/if}

<style lang="scss">
	@use '$styles/fonts/Sans';

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
		}
	}

	.sponsor-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
</style>
