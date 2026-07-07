<script lang="ts">
	import { run } from 'svelte/legacy';

	import { post } from '$lib/messenger';
	import Fabric from '$lib/components/Fabric.svelte';
	import ArrowDown from '$lib/components/icons/ArrowDown.svelte';
	import CrossIcon from '$lib/components/icons/CrossIcon.svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let expanded = $state(false);

	const toggleExpanded = () => (expanded = !expanded);

	run(() => {
		browser &&
			post({ type: 'resize', value: { height: expanded ? 500 : 250 } });
	});
</script>

<aside>
	<Fabric
		TrackingPixel={data.Trackingpixel}
		ResearchPixel={data.Researchpixel}
		ViewabilityPixel={data.Viewabilitypixel}
		BackgroundScrollType={data.ScrollType}
		BackgroundColour={data.Slide1BackgroundColour}
		BackgroundImage={data.Slide1BackgroundImage}
		BackgroundImagePosition={data.Slide1BackgroundPosition}
		BackgroundImageRepeat={data.Slide1BackgroundRepeat}
		MobileBackgroundImage={data.Slide1MobileBackgroundImage}
		MobileBackgroundImagePosition={data.Slide1MobileBackgroundPosition}
		MobileBackgroundImageRepeat={data.Slide1MobileBackgroundRepeat}
		Layer1BackgroundImage={data.Slide1Layer1BackgroundImage}
		Layer1BackgroundPosition={data.Slide1Layer1BackgroundPosition}
		Layer2BackgroundImage={data.Slide1Layer2BackgroundImage}
		Layer2BackgroundPosition={data.Slide1Layer2BackgroundPosition}
		Layer3BackgroundImage={data.Slide1Layer3BackgroundImage}
		Layer3BackgroundPosition={data.Slide1Layer3BackgroundPosition}
		MobileLayer1BackgroundImage={data.Slide1Layer1MobileBackgroundImage}
		MobileLayer1BackgroundPosition={data.Slide1Layer1MobileBackgroundPosition}
		MobileLayer2BackgroundImage={data.Slide1Layer2MobileBackgroundImage}
		MobileLayer2BackgroundPosition={data.Slide1Layer2MobileBackgroundPosition}
		MobileLayer3BackgroundImage={data.Slide1Layer3MobileBackgroundImage}
		MobileLayer3BackgroundPosition={data.Slide1Layer3MobileBackgroundPosition}
		IsFullWidthTopSlot={'no'}
		hasThirdPartyJSTracking={false}
	/>

	<Fabric
		TrackingPixel={data.Trackingpixel}
		ResearchPixel={data.Researchpixel}
		ViewabilityPixel={data.Viewabilitypixel}
		BackgroundScrollType={data.ScrollType}
		BackgroundColour={data.Slide2BackgroundColour}
		BackgroundImage={data.Slide2BackgroundImage}
		BackgroundImagePosition={data.Slide2BackgroundPosition}
		BackgroundImageRepeat={data.Slide2BackgroundRepeat}
		MobileBackgroundImage={data.Slide2MobileBackgroundImage}
		MobileBackgroundImagePosition={data.Slide2MobileBackgroundPosition}
		MobileBackgroundImageRepeat={data.Slide2MobileBackgroundRepeat}
		Layer1BackgroundImage={data.Slide2Layer1BackgroundImage}
		Layer1BackgroundPosition={data.Slide2Layer1BackgroundPosition}
		Layer2BackgroundImage={data.Slide2Layer2BackgroundImage}
		Layer2BackgroundPosition={data.Slide2Layer2BackgroundPosition}
		Layer3BackgroundImage={data.Slide2Layer3BackgroundImage}
		Layer3BackgroundPosition={data.Slide2Layer3BackgroundPosition}
		MobileLayer1BackgroundImage={data.Slide2Layer1MobileBackgroundImage}
		MobileLayer1BackgroundPosition={data.Slide2Layer1MobileBackgroundPosition}
		MobileLayer2BackgroundImage={data.Slide2Layer2MobileBackgroundImage}
		MobileLayer2BackgroundPosition={data.Slide2Layer2MobileBackgroundPosition}
		MobileLayer3BackgroundImage={data.Slide2Layer3MobileBackgroundImage}
		MobileLayer3BackgroundPosition={data.Slide2Layer3MobileBackgroundPosition}
		IsFullWidthTopSlot={'no'}
		hasThirdPartyJSTracking={false}
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
