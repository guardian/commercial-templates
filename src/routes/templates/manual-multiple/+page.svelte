<script lang="ts">
	import { paletteColours } from '$lib/components/colours/paletteColours';
	import ManualCard from '$lib/components/ManualCard.svelte';
	import ManualHeader from '$lib/components/ManualHeader.svelte';
	import SetHeightResizer from '$lib/components/SetHeightResizer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let {
		Tone,
		TitleURL,
		Explainer,
		ViewAll,
		IsProminent,
		Offer1Title,
		Offer2Title,
		Offer3Title,
		Offer4Title,
		Offer1Meta,
		Offer2Meta,
		Offer3Meta,
		Offer4Meta,
		Offer1LinkText,
		Offer2LinkText,
		Offer3LinkText,
		Offer4LinkText,
		Offer1Image,
		Offer2Image,
		Offer3Image,
		Offer4Image,
		Offer1URL,
		Offer2URL,
		Offer3URL,
		Offer4URL,
	} = data;

	let offers = [
		{
			title: Offer1Title,
			meta: Offer1Meta,
			linkText: Offer1LinkText,
			image: Offer1Image,
			url: Offer1URL,
		},
		{
			title: Offer2Title,
			meta: Offer2Meta,
			linkText: Offer2LinkText,
			image: Offer2Image,
			url: Offer2URL,
		},
		{
			title: Offer3Title,
			meta: Offer3Meta,
			linkText: Offer3LinkText,
			image: Offer3Image,
			url: Offer3URL,
		},
		{
			title: Offer4Title,
			meta: Offer4Meta,
			linkText: Offer4LinkText,
			image: Offer4Image,
			url: Offer4URL,
		},
	];

	const isProminent = IsProminent === 'true';

	offers = offers.filter(({ title }) => title !== '');

	$: height = -1;
</script>

<aside bind:clientHeight={height} style={paletteColours}>
	<ManualHeader buttonText={ViewAll} buttonUrl={TitleURL} tone={Tone}>
		{@html Explainer}
	</ManualHeader>
	<div class="cards-container" class:is-prominent={isProminent}>
		{#each offers as offer, i}
			<ManualCard
				image={offer.image}
				url={offer.url}
				linkText={offer.linkText}
				tone={Tone}
				isProminent={isProminent && i === 0}
			>
				<svelte:fragment slot="title">
					{@html offer.title}
				</svelte:fragment>
				<svelte:fragment slot="text">{@html offer.meta}</svelte:fragment>
			</ManualCard>
		{/each}
	</div>
</aside>
<SetHeightResizer {height} />

<style lang="scss">
	@use '$styles/fonts/Sans';
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
	}

	.cards-container {
		display: flex;
		flex-direction: row;

		&.is-prominent {
			> :global(:nth-child(1)) {
				min-width: calc(50% - 19px);
			}
			> :global(:nth-child(4)) {
				display: none;
			}
		}
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
