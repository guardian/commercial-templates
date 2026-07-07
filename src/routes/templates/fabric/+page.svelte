<script lang="ts">
	import Fabric from '$lib/components/Fabric.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<Fabric
	TrackingPixel={data.Trackingpixel}
	ResearchPixel={data.Researchpixel}
	ViewabilityPixel={data.Viewabilitypixel}
	BackgroundScrollType={data.BackgroundScrollType}
	BackgroundColour={data.BackgroundColour}
	BackgroundImage={data.BackgroundImage}
	BackgroundImagePosition={data.BackgroundImagePosition}
	BackgroundImageRepeat={data.BackgroundImageRepeat}
	MobileBackgroundImage={data.MobileBackgroundImage}
	MobileBackgroundImagePosition={data.MobileBackgroundImagePosition}
	MobileBackgroundImageRepeat={data.MobileBackgroundImageRepeat}
	Layer1BackgroundImage={data.Layer1BackgroundImage}
	Layer1BackgroundPosition={data.Layer1BackgroundPosition}
	Layer2BackgroundImage={data.Layer2BackgroundImage}
	Layer2BackgroundPosition={data.Layer2BackgroundPosition}
	Layer3BackgroundImage={data.Layer3BackgroundImage}
	Layer3BackgroundPosition={data.Layer3BackgroundPosition}
	MobileLayer1BackgroundImage={data.MobileLayer1BackgroundImage}
	MobileLayer1BackgroundPosition={data.MobileLayer1BackgroundPosition}
	MobileLayer2BackgroundImage={data.MobileLayer2BackgroundImage}
	MobileLayer2BackgroundPosition={data.MobileLayer2BackgroundPosition}
	MobileLayer3BackgroundImage={data.MobileLayer3BackgroundImage}
	MobileLayer3BackgroundPosition={data.MobileLayer3BackgroundPosition}
	IsFullWidthTopSlot={'no'}
/>
