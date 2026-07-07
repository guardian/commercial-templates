<script lang="ts">
	import { paletteColours } from '$lib/components/colours/paletteColours';
	import ManualCard from '$lib/components/ManualCard.svelte';
	import ManualHeader from '$lib/components/ManualHeader.svelte';
	import SetHeightResizer from '$lib/components/SetHeightResizer.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const offers = $derived.by(() =>
		[
			{
				title: data.Offer1Title,
				meta: data.Offer1Meta,
				linkText: data.Offer1LinkText,
				image: data.Offer1Image,
				url: data.Offer1URL,
			},
			{
				title: data.Offer2Title,
				meta: data.Offer2Meta,
				linkText: data.Offer2LinkText,
				image: data.Offer2Image,
				url: data.Offer2URL,
			},
			{
				title: data.Offer3Title,
				meta: data.Offer3Meta,
				linkText: data.Offer3LinkText,
				image: data.Offer3Image,
				url: data.Offer3URL,
			},
			{
				title: data.Offer4Title,
				meta: data.Offer4Meta,
				linkText: data.Offer4LinkText,
				image: data.Offer4Image,
				url: data.Offer4URL,
			},
		].filter(({ title }) => title !== ''),
	);

	const isProminent = $derived(data.IsProminent === 'true');

	let height = $derived(-1);
</script>

<aside bind:clientHeight={height} style={paletteColours}>
	<ManualHeader
		buttonText={data.ViewAll}
		buttonUrl={data.TitleURL}
		tone={data.Tone}
	>
		{@html data.Explainer}
	</ManualHeader>
	<div class="cards-container" class:is-prominent={isProminent}>
		{#each offers as offer, i}
			<ManualCard
				image={offer.image}
				url={offer.url}
				linkText={offer.linkText}
				tone={data.Tone}
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
	@use '$styles/fonts/Sans';

	:global(body) {
		margin: 0;
	}

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
