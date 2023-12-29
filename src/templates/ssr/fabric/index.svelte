<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
	import { CLICK_MACRO, GAMVariable } from '$lib/gam';
	import { isValidReplacedVariable } from '$lib/gam';
	import AdvertisementLabel from '$templates/components/AdvertisementLabel.svelte';
	import Pixel from '$templates/components/Pixel.svelte';

	export let Trackingpixel: GAMVariable;
	export let Researchpixel: GAMVariable;
	export let Viewabilitypixel: GAMVariable;
	export let ClickthroughUrl: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;

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
</script>

<AdvertisementLabel />
<div class="creative--fabric">
	<a
		id="linkDesktop"
		class="blink gs-container link hide-until-tablet"
		href={`${CLICK_MACRO}${ClickthroughUrl}`}
		target="_blank"
	>
		<div class="creative-container">
			<div class="alt">
				<div
					class="layer layer1"
					style:background-image={`url('${Layer1BackgroundImage}')`}
					style:background-position={Layer1BackgroundPosition}
				/>
				<div
					id="layer2"
					class="layer layer2"
					style:background-image={`url('${Layer2BackgroundImage}')`}
					style:background-position={Layer2BackgroundPosition}
				/>
				<div
					class="layer layer3"
					style:background-image={`url('${Layer3BackgroundImage}')`}
					style:background-position={Layer3BackgroundPosition}
				/>
			</div>
		</div>
	</a>
	<a
		id="linkMobile"
		class="blink gs-container link mobile-only"
		href={`${CLICK_MACRO}${ClickthroughUrl}`}
		target="_blank"
	>
		<div class="creative-container">
			<div class="alt">
				<div
					class="layer layer1"
					style:background-image={`url('${MobileLayer1BackgroundImage}')`}
					style:background-position={MobileLayer1BackgroundPosition}
				/>
				<div
					class="layer layer2"
					style:background-image={`url('${MobileLayer2BackgroundImage}')`}
					style:background-position={MobileLayer2BackgroundPosition}
				/>
				<div
					class="layer layer3"
					style:background-image={`url('${MobileLayer3BackgroundImage}')`}
					style:background-position={MobileLayer3BackgroundPosition}
				/>
			</div>
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

{thirdPartyJSTracking}

<style lang="scss">
	$gs-gutter: 20px;
	$gs-max-columns: 16;
	.blink {
		display: block;
		text-decoration: none;
	}
	.gs-container {
		position: relative;

		@media (min-width: 740px) {
			padding: 0 calc(50% - #{(gs-span(9) + $gs-gutter * 2) / 2});
		}

		@media (min-width: 980px) {
			padding: 0 calc(50% - #{(gs-span(12) + $gs-gutter * 2) / 2});
		}

		@media (min-width: 1140px) {
			padding: 0 calc(50% - #{(gs-span(14) + $gs-gutter * 2) / 2});
		}

		@media (min-width: 1300px) {
			padding: 0 calc(50% - #{(gs-span($gs-max-columns) + $gs-gutter * 2) / 2});
		}
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

		.layer1 {
			z-index: 1;
		}
		.layer2 {
			z-index: 2;
		}
		.layer3 {
			z-index: 3;
		}
		.alt,
		.layer {
			width: 100%;
			height: 250px;
			position: absolute;
			top: 0;
			left: 0;
			background-repeat: no-repeat;
		}
	}
	@media (max-width: 739px) {
		.hide-until-tablet {
			display: none !important;
		}
	}
	@media (min-width: 740px) {
		.mobile-only {
			display: none !important;
		}
	}
</style>
