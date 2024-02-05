<script lang="ts">
	import { CLICK_MACRO, DEST_URL, isValidReplacedVariable } from '$lib/gam';
	import { post } from '$lib/messenger';
	import AdvertisementLabel from '$templates/components/AdvertisementLabel.svelte';
	import Pixel from '$templates/components/Pixel.svelte';

	export let Trackingpixel: string;
	export let Researchpixel: string;
	export let Viewabilitypixel: string;
	export let thirdPartyJSTracking: string;
	export let BackgroundScrollType: 'parallax' | 'none' | 'fixed';
	export let BackgroundColour: string;
	export let BackgroundImage: string;
	export let BackgroundImagePosition: string;
	export let BackgroundImageRepeat: string;
	export let MobileBackgroundImage: string;
	export let MobileBackgroundImagePosition: string;
	export let MobileBackgroundImageRepeat: string;
	export let Layer1BackgroundImage: string;
	export let Layer1BackgroundPosition: string;
	export let Layer2BackgroundImage: string;
	export let Layer2BackgroundPosition: string;
	export let Layer3BackgroundImage: string;
	export let Layer3BackgroundPosition: string;
	export let MobileLayer1BackgroundImage: string;
	export let MobileLayer1BackgroundPosition: string;
	export let MobileLayer2BackgroundImage: string;
	export let MobileLayer2BackgroundPosition: string;
	export let MobileLayer3BackgroundImage: string;
	export let MobileLayer3BackgroundPosition: string;

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

<AdvertisementLabel fullWidth={BackgroundScrollType === 'parallax'} />
<a
	class="fabric-container"
	class:is-parallax={BackgroundScrollType === 'parallax'}
	href={`${CLICK_MACRO}${DEST_URL}`}
	target="_blank"
>
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
</a>

{#if isValidReplacedVariable(Trackingpixel)}
	<Pixel src={Trackingpixel} />
{:else if isValidReplacedVariable(Researchpixel)}
	<Pixel src={Researchpixel} />
{:else if isValidReplacedVariable(Viewabilitypixel)}
	<Pixel src={Viewabilitypixel} />
{/if}

{@html thirdPartyJSTracking}

<style lang="scss">
	:global(body) {
		background-color: var(--background-color);
	}

	.fabric-container {
		display: block;
		position: relative;
		text-decoration: none;
		margin: 0 auto;
		height: 250px;
		overflow: hidden;

		&.is-parallax .layer {
			background-size: auto;
		}

		@media (min-width: 740px) {
			max-width: 740px;
		}
		@media (min-width: 980px) {
			max-width: 980px;
		}
		@media (min-width: 1140px) {
			max-width: 1140px;
		}
		@media (min-width: 1300px) {
			max-width: 1300px;
		}
	}

	.layer {
		width: 100%;
		height: 250px;
		position: absolute;
		top: 0;
		left: 0;

		background-repeat: no-repeat;
		background-size: cover;
		background-image: var(--mobile-background-image);
		background-position: var(--mobile-background-position);
	}

	@media (min-width: 740px) {
		.layer {
			background-image: var(--desktop-background-image);
			background-position: var(--desktop-background-position);
		}
	}
</style>
