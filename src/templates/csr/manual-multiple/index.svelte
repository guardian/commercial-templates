<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import '$templates/components/fonts/Sans.css';
	import SubscriptionsLogo from '$templates/components/icons/SubscriptionsLogo.svelte';
	import ManualCard from '$templates/components/ManualCard.svelte';
	import ManualHeader from '$templates/components/ManualHeader.svelte';
	import Resizer from '$templates/components/Resizer.svelte';

	export let Title: GAMVariable;
	export let TitleURL: GAMVariable;
	export let Explainer: GAMVariable;
	export let ViewAll: GAMVariable;
	export let IsProminent: GAMVariable;
	export let Offer1Title: GAMVariable;
	export let Offer2Title: GAMVariable;
	export let Offer3Title: GAMVariable;
	export let Offer4Title: GAMVariable;
	export let Offer1Meta: GAMVariable;
	export let Offer2Meta: GAMVariable;
	export let Offer3Meta: GAMVariable;
	export let Offer4Meta: GAMVariable;
	export let Offer1LinkText: GAMVariable;
	export let Offer2LinkText: GAMVariable;
	export let Offer3LinkText: GAMVariable;
	export let Offer4LinkText: GAMVariable;
	export let Offer1Image: GAMVariable;
	export let Offer2Image: GAMVariable;
	export let Offer3Image: GAMVariable;
	export let Offer4Image: GAMVariable;
	export let Offer1URL: GAMVariable;
	export let Offer2URL: GAMVariable;
	export let Offer3URL: GAMVariable;
	export let Offer4URL: GAMVariable;

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

	offers = offers.filter((offer) => offer.title !== '');

	let height: number = -1;
</script>

<aside bind:clientHeight={height}>
	<ManualHeader
		buttonText={ViewAll}
		buttonUrl={TitleURL}
		backgroundColour="#005689"
		buttonColour="#ffe500"
	>
		<svelte:fragment slot="logo">
			<SubscriptionsLogo />
		</svelte:fragment>
		<svelte:fragment slot="description">
			{Explainer}
		</svelte:fragment>
	</ManualHeader>
	<div class="cards-container">
		{#each offers as offer}
			<ManualCard
				image={offer.image}
				url={offer.url}
				callToAction={offer.linkText}
				buttonColour="#005689"
			>
				<svelte:fragment slot="title">
					{offer.title}
				</svelte:fragment>
				<svelte:fragment slot="text">{offer.meta}</svelte:fragment>
			</ManualCard>
		{/each}
	</div>
</aside>
<Resizer {height} />

<style lang="scss">
	aside {
		background: #f6f6f6;
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
	}

	.cards-container {
		display: flex;
		flex-direction: row;
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
