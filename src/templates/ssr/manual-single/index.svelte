<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import { clickMacro } from '$lib/gam';
	import '$templates/components/colours/tones.css';
	import '$templates/components/fonts/Egyptian.css';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import ArrowRight from '$templates/components/icons/ArrowRight.svelte';
	import BrandLogo from '$templates/components/icons/BrandLogo.svelte';

	export let Tone: GAMVariable;
	export let TitleURL: GAMVariable;
	export let OfferURL: GAMVariable;
	export let Explainer: GAMVariable;
	export let ViewAll: GAMVariable;

	// What’s this about?
	export let OmnitureId: GAMVariable;
</script>

<aside
	data-tone={Tone}
	data-link-name={['creative', 'ad single manual', OmnitureId].join(' | ')}
	style={paletteColours}
>
	<header>
		<h1 class="adverts__title" data-tone="travel">
			<a
				class="adverts__logo brand_logo"
				href={clickMacro(TitleURL)}
				data-link-name="title"
				target="_top"><BrandLogo /></a
			>
		</h1>
		<div class="adverts_blurb">
			{Explainer}
		</div>
	</header>
	<div class="adverts">
		<a
			class="single"
			href={clickMacro(OfferURL)}
			data-link-name="[%OfferTitle%]"
			target="_top"
		>
			<div class="advert__text">
				<h2 class="blink__anchor advert__title">[%OfferTitle%]</h2>
				<p class="advert__standfirst">[%OfferText%]</p>
			</div>
		</a>
		<a
			class="hide-until-mobile-landscape button"
			href={clickMacro(TitleURL)}
			data-link-name="viewall"
			target="_top"
		>
			{ViewAll}
			<ArrowRight width={24} />
		</a>
	</div>
</aside>

<style lang="scss">
	aside {
		height: 250px;
		width: 100%;
		max-width: 1300px;
		display: flex;
		flex-direction: column;
		font-family: 'Guardian Text Egyptian', 'GuardianTextEgyptian', Georgia,
			serif;
		background-color: var(--neutral-97);

		@media (min-width: 1140px) {
			flex-direction: row;
		}
	}

	h2 {
		font-weight: normal;
	}

	header {
		color: var(--fg, white);
		background-color: var(--bg, black);
		flex: 0 1 171px;
		padding: 12px 20px;

		a {
			color: inherit;
		}

		.adverts_blurb {
			padding: 2px 5px;
			background-color: white;
			color: black;
		}

		@media (min-width: 1140px) {
			flex-grow: 0;
		}
		@media (min-width: 1300px) {
			flex-basis: 251px;
		}
	}

	.adverts {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		flex: 1 1 100%;
	}

	a.single {
		text-decoration: none;
		color: #111;
		font-size: 12px;
		line-height: 16px;

		&:hover {
			h2 {
				text-decoration: underline;
			}
		}
	}

	a.button {
		background: var(--brand-alt-400);
		color: black;
		text-decoration: none;
		border-radius: 10rem;
		padding: 3px;
		padding-left: 1rem;
		align-self: flex-start;
		flex-shrink: 0;
	}
</style>
