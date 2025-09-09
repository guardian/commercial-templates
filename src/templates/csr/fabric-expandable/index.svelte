<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import { post } from '$lib/messenger';
	import Fabric from '$templates/components/Fabric.svelte';
	import ArrowDown from '$templates/components/icons/ArrowDown.svelte';
	import CrossIcon from '$templates/components/icons/CrossIcon.svelte';

	export let Trackingpixel: GAMVariable;
	export let Researchpixel: GAMVariable;
	export let Viewabilitypixel: GAMVariable;

	export let ScrollType: GAMVariable<'parallax' | 'none' | 'fixed'>;

	export let Slide1BackgroundColour: GAMVariable;
	export let Slide1BackgroundImage: GAMVariable;
	export let Slide1BackgroundRepeat: GAMVariable;
	export let Slide1BackgroundPosition: GAMVariable;
	export let Slide1MobileBackgroundImage: GAMVariable;
	export let Slide1MobileBackgroundRepeat: GAMVariable;
	export let Slide1MobileBackgroundPosition: GAMVariable;
	export let Slide1Layer1BackgroundImage: GAMVariable;
	export let Slide1Layer1BackgroundPosition: GAMVariable;
	export let Slide1Layer1MobileBackgroundImage: GAMVariable;
	export let Slide1Layer1MobileBackgroundPosition: GAMVariable;
	export let Slide1Layer2BackgroundImage: GAMVariable;
	export let Slide1Layer2BackgroundPosition: GAMVariable;
	export let Slide1Layer2MobileBackgroundImage: GAMVariable;
	export let Slide1Layer2MobileBackgroundPosition: GAMVariable;
	export let Slide1Layer3BackgroundImage: GAMVariable;
	export let Slide1Layer3BackgroundPosition: GAMVariable;
	export let Slide1Layer3MobileBackgroundImage: GAMVariable;
	export let Slide1Layer3MobileBackgroundPosition: GAMVariable;

	export let Slide2BackgroundColour: GAMVariable;
	export let Slide2BackgroundImage: GAMVariable;
	export let Slide2BackgroundRepeat: GAMVariable;
	export let Slide2BackgroundPosition: GAMVariable;
	export let Slide2MobileBackgroundImage: GAMVariable;
	export let Slide2MobileBackgroundRepeat: GAMVariable;
	export let Slide2MobileBackgroundPosition: GAMVariable;
	export let Slide2Layer1BackgroundImage: GAMVariable;
	export let Slide2Layer1BackgroundPosition: GAMVariable;
	export let Slide2Layer1MobileBackgroundImage: GAMVariable;
	export let Slide2Layer1MobileBackgroundPosition: GAMVariable;
	export let Slide2Layer2BackgroundImage: GAMVariable;
	export let Slide2Layer2BackgroundPosition: GAMVariable;
	export let Slide2Layer2MobileBackgroundImage: GAMVariable;
	export let Slide2Layer2MobileBackgroundPosition: GAMVariable;
	export let Slide2Layer3BackgroundImage: GAMVariable;
	export let Slide2Layer3BackgroundPosition: GAMVariable;
	export let Slide2Layer3MobileBackgroundImage: GAMVariable;
	export let Slide2Layer3MobileBackgroundPosition: GAMVariable;

	let expanded = false;

	const toggleExpanded = () => (expanded = !expanded);

	$: post({ type: 'resize', value: { height: expanded ? 500 : 250 } });
</script>

<aside>
	<Fabric
		TrackingPixel={Trackingpixel}
		ResearchPixel={Researchpixel}
		ViewabilityPixel={Viewabilitypixel}
		BackgroundScrollType={ScrollType}
		BackgroundColour={Slide1BackgroundColour}
		BackgroundImage={Slide1BackgroundImage}
		BackgroundImagePosition={Slide1BackgroundPosition}
		BackgroundImageRepeat={Slide1BackgroundRepeat}
		MobileBackgroundImage={Slide1MobileBackgroundImage}
		MobileBackgroundImagePosition={Slide1MobileBackgroundPosition}
		MobileBackgroundImageRepeat={Slide1MobileBackgroundRepeat}
		Layer1BackgroundImage={Slide1Layer1BackgroundImage}
		Layer1BackgroundPosition={Slide1Layer1BackgroundPosition}
		Layer2BackgroundImage={Slide1Layer2BackgroundImage}
		Layer2BackgroundPosition={Slide1Layer2BackgroundPosition}
		Layer3BackgroundImage={Slide1Layer3BackgroundImage}
		Layer3BackgroundPosition={Slide1Layer3BackgroundPosition}
		MobileLayer1BackgroundImage={Slide1Layer1MobileBackgroundImage}
		MobileLayer1BackgroundPosition={Slide1Layer1MobileBackgroundPosition}
		MobileLayer2BackgroundImage={Slide1Layer2MobileBackgroundImage}
		MobileLayer2BackgroundPosition={Slide1Layer2MobileBackgroundPosition}
		MobileLayer3BackgroundImage={Slide1Layer3MobileBackgroundImage}
		MobileLayer3BackgroundPosition={Slide1Layer3MobileBackgroundPosition}
		FullWidthTopSlot={'no'}
	/>

	<Fabric
		TrackingPixel={Trackingpixel}
		ResearchPixel={Researchpixel}
		ViewabilityPixel={Viewabilitypixel}
		BackgroundScrollType={ScrollType}
		BackgroundColour={Slide2BackgroundColour}
		BackgroundImage={Slide2BackgroundImage}
		BackgroundImagePosition={Slide2BackgroundPosition}
		BackgroundImageRepeat={Slide2BackgroundRepeat}
		MobileBackgroundImage={Slide2MobileBackgroundImage}
		MobileBackgroundImagePosition={Slide2MobileBackgroundPosition}
		MobileBackgroundImageRepeat={Slide2MobileBackgroundRepeat}
		Layer1BackgroundImage={Slide2Layer1BackgroundImage}
		Layer1BackgroundPosition={Slide2Layer1BackgroundPosition}
		Layer2BackgroundImage={Slide2Layer2BackgroundImage}
		Layer2BackgroundPosition={Slide2Layer2BackgroundPosition}
		Layer3BackgroundImage={Slide2Layer3BackgroundImage}
		Layer3BackgroundPosition={Slide2Layer3BackgroundPosition}
		MobileLayer1BackgroundImage={Slide2Layer1MobileBackgroundImage}
		MobileLayer1BackgroundPosition={Slide2Layer1MobileBackgroundPosition}
		MobileLayer2BackgroundImage={Slide2Layer2MobileBackgroundImage}
		MobileLayer2BackgroundPosition={Slide2Layer2MobileBackgroundPosition}
		MobileLayer3BackgroundImage={Slide2Layer3MobileBackgroundImage}
		MobileLayer3BackgroundPosition={Slide2Layer3MobileBackgroundPosition}
		FullWidthTopSlot={'no'}
	/>

	<div class={expanded ? 'button-container expanded' : 'button-container'}>
		<button on:click={() => toggleExpanded()} class="toggle-cross">
			<CrossIcon plus={expanded} />
		</button>

		<button on:click={() => toggleExpanded()} class="toggle-arrow">
			<ArrowDown flip={expanded} />
		</button>
	</div>
</aside>

<style lang="scss">
	.button-container {
		position: absolute;
		top: 0;
		width: 100%;
		height: 250px;
		transition: height 1s;
		pointer-events: none;

		&.expanded {
			height: 500px;
		}
	}

	button {
		touch-action: manipulation;
		cursor: pointer;
		box-sizing: border-box;
		position: absolute;
		z-index: 100;
		padding: 0;
		background: #000;
		fill: #fff;
		box-shadow:
			0 0 1px 0 #fff inset,
			0 0 1px 0 #fff;
		border-color: #fff;
		border-style: solid;
		pointer-events: auto;
	}

	.toggle-cross {
		top: 10px;
		right: 10px;
		border-radius: 100%;
		border-width: 1px;
		transition: transform 1s;
		transform: rotate(45deg);
		overflow: hidden;
	}

	.toggle-arrow {
		bottom: 0;
		left: 50%;
		width: 60px;
		height: 30px;
		margin-left: -30px;
		background-color: #333;
		border-radius: 20px 20px 0 0;
		border-width: 1px 1px 0;
		opacity: 0.75;
	}
</style>
