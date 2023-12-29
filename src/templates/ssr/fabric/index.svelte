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
		class="gs-container link"
		href={`${CLICK_MACRO}${ClickthroughUrl}`}
		target="_blank"
	>
		<div class="creative-container">
			<div
				class="layer"
				style:--tablet-background-image={`url('${Layer1BackgroundImage}')`}
				style:--tablet-background-position={Layer1BackgroundPosition}
				style:--mobile-background-image={`url('${MobileLayer1BackgroundImage}')`}
				style:--mobile-background-position={`url('${MobileLayer1BackgroundPosition}')`}
			/>
			<div
				id="layer2"
				class="layer"
				style:--tablet-background-image={`url('${Layer2BackgroundImage}')`}
				style:--tablet-background-position={Layer2BackgroundPosition}
				style:--mobile-background-image={`url('${MobileLayer2BackgroundImage}')`}
				style:--mobile-background-position={`url('${MobileLayer2BackgroundPosition}')`}
			/>
			<div
				class="layer"
				style:--tablet-background-image={`url('${Layer3BackgroundImage}')`}
				style:--tablet-background-position={Layer3BackgroundPosition}
				style:--mobile-background-image={`url('${MobileLayer3BackgroundImage}')`}
				style:--mobile-background-position={`url('${MobileLayer3BackgroundPosition}')`}
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

{thirdPartyJSTracking}

<style lang="scss">
	@import '../../../styles/helpers.scss';
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
	}
	@media (min-width: 740px) {
		.layer {
			background-image: var(--tablet-background-image);
			background-position: var(--tablet-background-position);
		}
	}
</style>
