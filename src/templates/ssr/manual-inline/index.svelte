<script lang="ts">
	import '$templates/components/colours/tones.css';
	import '$templates/components/fonts/Sans.css';
	import '$templates/components/fonts/SansBold.css';
	import '$templates/components/fonts/EgyptianBold.css';
	import { clickMacro } from '$lib/gam';
	import type { GAMVariable } from '$lib/gam';
	import type { Tone as TTone } from '$lib/types/tones';
	import { paletteColours } from '$templates/components/colours/paletteColours';
	import ArrowRight from '$templates/components/icons/ArrowRight.svelte';
	import ToneLogo from '$templates/components/ToneLogo.svelte';

	export let TrackingId: GAMVariable;
	export let Tone: GAMVariable<TTone>;
	export let BaseUrl: GAMVariable;
	export let OfferUrl: GAMVariable;
	export let OfferTitle: GAMVariable;
	export let OfferImage: GAMVariable;
	export let OfferText: GAMVariable;
	export let OfferLinkText: GAMVariable;
</script>

<aside
	data-tone={Tone}
	data-link-name="creative | manual inline | {TrackingId}"
	style={paletteColours}
>
	<header>
		<a
			href={clickMacro(BaseUrl)}
			class="logo"
			data-link-name="title"
			target="_top"
		>
			<ToneLogo tone={Tone} />
		</a>
	</header>
	<a
		href={clickMacro(OfferUrl)}
		data-link-name="Offer 1 | {OfferTitle}"
		class="card"
		target="_top"
	>
		<img src={OfferImage} alt={OfferTitle} />
		<div class="text {OfferLinkText}">
			<h2>{OfferTitle}</h2>
			<p>{OfferText}</p>
			<div class="button">
				{OfferLinkText}
				<ArrowRight width={24} />
			</div>
		</div>
	</a>
</aside>

<style lang="scss">
	aside {
		background: var(--neutral-93);
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
	}

	header {
		background-color: var(--bg);
		display: flex;

		a {
			padding: 6px 5px;
		}
	}

	.card {
		text-decoration: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;

		&:hover .button {
			background: #01161e;
		}
	}

	img {
		max-width: 100%;
	}

	.text {
		display: flex;
		flex-direction: column;
		margin: 6px 5px;
		color: var(--neutral-7);
		font-size: 0.75rem;
		line-height: 1.33;
	}

	h2 {
		margin: 0;
		font-family: 'Guardian Text Egyptian', 'GuardianTextEgyptian', Georgia,
			serif;
		font-size: 1rem;
		line-height: 1.25;
	}

	// p tags are currently inserted into some GAM Creatives, e.g. Offer Text in Creative with ID: 138461351383.
	// global is required since these added p tags are not specified in the HTML above.
	:global(p) {
		color: var(--neutral-7);
		margin: 0 0 0.5em;
	}

	.button {
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-weight: 700;
		color: var(--neutral-100);
		width: fit-content;
		background: #012937;
		border-radius: 100px;
		padding-left: 8px;
		display: flex;
		align-items: center;
	}
</style>
