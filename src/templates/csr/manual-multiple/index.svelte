<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import '$templates/components/fonts/Sans.css';
	import type { Tone as TTone } from '$lib/types/tones';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import ManualCard from '$templates/components/ManualCard.svelte';
	import ManualHeader from '$templates/components/ManualHeader.svelte';
	import SetHeightResizer from '$templates/components/SetHeightResizer.svelte';

	interface Props {
		Tone: GAMVariable<TTone>;
		TitleURL: GAMVariable;
		Explainer: GAMVariable;
		ViewAll: GAMVariable;
		IsProminent: GAMVariable;
		Offer1Title: GAMVariable;
		Offer2Title: GAMVariable;
		Offer3Title: GAMVariable;
		Offer4Title: GAMVariable;
		Offer1Meta: GAMVariable;
		Offer2Meta: GAMVariable;
		Offer3Meta: GAMVariable;
		Offer4Meta: GAMVariable;
		Offer1LinkText: GAMVariable;
		Offer2LinkText: GAMVariable;
		Offer3LinkText: GAMVariable;
		Offer4LinkText: GAMVariable;
		Offer1Image: GAMVariable;
		Offer2Image: GAMVariable;
		Offer3Image: GAMVariable;
		Offer4Image: GAMVariable;
		Offer1URL: GAMVariable;
		Offer2URL: GAMVariable;
		Offer3URL: GAMVariable;
		Offer4URL: GAMVariable;
	}

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
	}: Props = $props();

	let offers = $state([
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
	]);

	const isProminent = IsProminent === 'true';

	offers = offers.filter(({ title }) => title !== '');

	let height: number = $state(-1);
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
				{#snippet title()}
					{@html offer.title}
				{/snippet}
				{#snippet text()}
					{@html offer.meta}
				{/snippet}
			</ManualCard>
		{/each}
	</div>
</aside>
<SetHeightResizer {height} />

<style lang="scss">
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
