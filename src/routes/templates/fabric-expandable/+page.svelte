<script lang="ts">
	import { post } from '$lib/messenger';
	import Fabric from '$templates/components/Fabric.svelte';
	import ArrowDown from '$templates/components/icons/ArrowDown.svelte';
	import CrossIcon from '$templates/components/icons/CrossIcon.svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	export let data: PageData;

	let {
		Trackingpixel,
		Researchpixel,
		Viewabilitypixel,
		ScrollType,
		Slide1BackgroundColour,
		Slide1BackgroundImage,
		Slide1BackgroundRepeat,
		Slide1BackgroundPosition,
		Slide1MobileBackgroundImage,
		Slide1MobileBackgroundRepeat,
		Slide1MobileBackgroundPosition,
		Slide1Layer1BackgroundImage,
		Slide1Layer1BackgroundPosition,
		Slide1Layer1MobileBackgroundImage,
		Slide1Layer1MobileBackgroundPosition,
		Slide1Layer2BackgroundImage,
		Slide1Layer2BackgroundPosition,
		Slide1Layer2MobileBackgroundImage,
		Slide1Layer2MobileBackgroundPosition,
		Slide1Layer3BackgroundImage,
		Slide1Layer3BackgroundPosition,
		Slide1Layer3MobileBackgroundImage,
		Slide1Layer3MobileBackgroundPosition,
		Slide2BackgroundColour,
		Slide2BackgroundImage,
		Slide2BackgroundRepeat,
		Slide2BackgroundPosition,
		Slide2MobileBackgroundImage,
		Slide2MobileBackgroundRepeat,
		Slide2MobileBackgroundPosition,
		Slide2Layer1BackgroundImage,
		Slide2Layer1BackgroundPosition,
		Slide2Layer1MobileBackgroundImage,
		Slide2Layer1MobileBackgroundPosition,
		Slide2Layer2BackgroundImage,
		Slide2Layer2BackgroundPosition,
		Slide2Layer2MobileBackgroundImage,
		Slide2Layer2MobileBackgroundPosition,
		Slide2Layer3BackgroundImage,
		Slide2Layer3BackgroundPosition,
		Slide2Layer3MobileBackgroundImage,
		Slide2Layer3MobileBackgroundPosition,
	} = data;

	let expanded = false;

	const toggleExpanded = () => (expanded = !expanded);

	$: browser &&
		post({ type: 'resize', value: { height: expanded ? 500 : 250 } });
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
		IsFullWidthTopSlot={'no'}
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
		IsFullWidthTopSlot={'no'}
	/>

	<div class={expanded ? 'button-container expanded' : 'button-container'}>
		<button onclick={() => toggleExpanded()} class="toggle-cross">
			<CrossIcon plus={expanded} />
		</button>

		<button onclick={() => toggleExpanded()} class="toggle-arrow">
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
