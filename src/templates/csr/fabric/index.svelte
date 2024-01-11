<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
	import { post } from '$lib/messenger';
	import { CLICK_MACRO, DEST_URL, GAMVariable } from '$lib/gam';
	import { isValidReplacedVariable } from '$lib/gam';
	import AdvertisementLabel from '$templates/components/AdvertisementLabel.svelte';
	import Pixel from '$templates/components/Pixel.svelte';

	export let Trackingpixel: GAMVariable;
	export let Researchpixel: GAMVariable;
	export let Viewabilitypixel: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;

	export let BackgroundScrollType: GAMVariable<'parallax' | 'none' | 'fixed'>;
	export let BackgroundColour: GAMVariable;
	export let BackgroundImage: GAMVariable;
	export let BackgroundImagePosition: GAMVariable;
	export let BackgroundImageRepeat: GAMVariable;
	export let MobileBackgroundImage: GAMVariable;
	export let MobileBackgroundImagePosition: GAMVariable;
	export let MobileBackgroundImageRepeat: GAMVariable;

	export let Layer1BackgroundImage: GAMVariable;
	export let Layer1BackgroundPosition: GAMVariable;
	export let Layer2BackgroundImage: GAMVariable;
	export let Layer2BackgroundPosition: GAMVariable;
	export let Layer3BackgroundImage: GAMVariable;
	export let Layer3BackgroundPosition: GAMVariable;

	export let MobileLayer1BackgroundImage: GAMVariable;
	export let MobileLayer1BackgroundPosition: GAMVariable;
	export let MobileLayer2BackgroundImage: GAMVariable;
	export let MobileLayer2BackgroundPosition: GAMVariable;
	export let MobileLayer3BackgroundImage: GAMVariable;
	export let MobileLayer3BackgroundPosition: GAMVariable;

	const isMobile = window.matchMedia('(max-width: 739px)').matches;
	const isTablet = window.matchMedia(
		'(min-width: 740px) and (max-width: 979px)',
	).matches;

	const [backgroundImage, backgroundPosition, backgroundRepeat] = isMobile
		? [
				MobileBackgroundImage,
				MobileBackgroundImagePosition,
				MobileBackgroundImageRepeat,
		  ]
		: [BackgroundImage, BackgroundImagePosition, BackgroundImageRepeat];

	const checkScrollType = (scrollType: string): string =>
		scrollType === 'parallax' && (isMobile || isTablet) ? 'fixed' : scrollType;

	post({
		type: 'background',
		value: {
			scrollType: checkScrollType(BackgroundScrollType),
			backgroundColor: BackgroundColour,
			backgroundImage: `url('${backgroundImage}')`,
			backgroundRepeat,
			backgroundPosition,
		},
	});
</script>

<svelte:body style:--background-color={BackgroundColour} />
<AdvertisementLabel />
<div class="creative--fabric">
	<a
		class="gs-container link"
		class:is-parallax={BackgroundScrollType === 'parallax'}
		href={`${CLICK_MACRO}${DEST_URL}`}
		target="_blank"
	>
		<div class="creative-container">
			<div
				class="layer"
				style:--desktop-background-image={`url('${Layer1BackgroundImage}')`}
				style:--desktop-background-position={Layer1BackgroundPosition}
				style:--mobile-background-image={`url('${MobileLayer1BackgroundImage}')`}
				style:--mobile-background-position={MobileLayer1BackgroundPosition}
			/>
			<div
				class="layer"
				style:--desktop-background-image={`url('${Layer2BackgroundImage}')`}
				style:--desktop-background-position={Layer2BackgroundPosition}
				style:--mobile-background-image={`url('${MobileLayer2BackgroundImage}')`}
				style:--mobile-background-position={MobileLayer2BackgroundPosition}
			/>
			<div
				class="layer"
				style:--desktop-background-image={`url('${Layer3BackgroundImage}')`}
				style:--desktop-background-position={Layer3BackgroundPosition}
				style:--mobile-background-image={`url('${MobileLayer3BackgroundImage}')`}
				style:--mobile-background-position={MobileLayer3BackgroundPosition}
			/>
		</div>
	</a>
	{#if isValidReplacedVariable(Trackingpixel)}
		<Pixel src={Trackingpixel} />
	{:else if isValidReplacedVariable(Researchpixel)}
		<Pixel src={Researchpixel} />
	{:else if isValidReplacedVariable(Viewabilitypixel)}
		<Pixel src={Viewabilitypixel} />
	{/if}
</div>

{@html thirdPartyJSTracking}

<style lang="scss">
	@import '../../../styles/helpers.scss';
	:global(body) {
		background-color: var(--background-color);
	}
	.link {
		display: block;
		text-decoration: none;
	}
	.creative-container {
		position: relative;
	}
	.creative--fabric {
		display: block;
		position: relative;
		&,
		.link {
			height: 250px;
			overflow: hidden;
		}
		.is-parallax {
			&.gs-container {
				padding: 0 calc(50% - 650px);
			}
		}
		.layer {
			width: 100%;
			height: 250px;
			position: absolute;
			top: 0;
			left: 0;

			background-repeat: no-repeat;
			background-image: var(--mobile-background-image);
			background-position: var(--mobile-background-position);
		}
		@media (min-width: 740px) {
			.layer {
				background-image: var(--desktop-background-image);
				background-position: var(--desktop-background-position);
			}
		}
	}
</style>
