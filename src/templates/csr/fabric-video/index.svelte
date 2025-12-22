<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import Fabric from '$templates/components/Fabric.svelte';

	interface Props {
		Trackingpixel: GAMVariable;
		Researchpixel: GAMVariable;
		Viewabilitypixel: GAMVariable;
		BackgroundColour: GAMVariable;
		BackgroundImage: GAMVariable;
		BackgroundPosition: GAMVariable;
		BackgroundRepeat: GAMVariable;
		Layer1BackgroundImage: GAMVariable;
		Layer1BackgroundPosition: GAMVariable;
		Layer2BackgroundImage: GAMVariable;
		Layer2BackgroundPosition: GAMVariable;
		Layer3BackgroundImage: GAMVariable;
		Layer3BackgroundPosition: GAMVariable;
		MobileBackgroundImage: GAMVariable;
		MobileBackgroundPosition: GAMVariable;
		MobileBackgroundRepeat: GAMVariable;
		MobileLayer1BackgroundImage: GAMVariable;
		MobileLayer1BackgroundPosition: GAMVariable;
		MobileLayer2BackgroundImage: GAMVariable;
		MobileLayer2BackgroundPosition: GAMVariable;
		MobileLayer3BackgroundImage: GAMVariable;
		MobileLayer3BackgroundPosition: GAMVariable;
		VideoURL: GAMVariable;
		VideoBackupImage: GAMVariable;
		MobileVideoBackupImage: GAMVariable;
		VideoURLMobile: GAMVariable;
		VideoAlignment: GAMVariable;
		IsFullWidthTopSlot: GAMVariable<'yes' | 'no'>;
	}

	let {
		Trackingpixel,
		Researchpixel,
		Viewabilitypixel,
		BackgroundColour,
		BackgroundImage,
		BackgroundPosition,
		BackgroundRepeat,
		Layer1BackgroundImage,
		Layer1BackgroundPosition,
		Layer2BackgroundImage,
		Layer2BackgroundPosition,
		Layer3BackgroundImage,
		Layer3BackgroundPosition,
		MobileBackgroundImage,
		MobileBackgroundPosition,
		MobileBackgroundRepeat,
		MobileLayer1BackgroundImage,
		MobileLayer1BackgroundPosition,
		MobileLayer2BackgroundImage,
		MobileLayer2BackgroundPosition,
		MobileLayer3BackgroundImage,
		MobileLayer3BackgroundPosition,
		VideoURL,
		VideoBackupImage,
		MobileVideoBackupImage,
		VideoURLMobile,
		VideoAlignment,
		IsFullWidthTopSlot,
	}: Props = $props();
</script>

<Fabric
	TrackingPixel={Trackingpixel}
	ResearchPixel={Researchpixel}
	ViewabilityPixel={Viewabilitypixel}
	{BackgroundColour}
	{BackgroundImage}
	BackgroundImagePosition={BackgroundPosition}
	BackgroundImageRepeat={BackgroundRepeat}
	{MobileBackgroundImage}
	MobileBackgroundImagePosition={MobileBackgroundPosition}
	MobileBackgroundImageRepeat={MobileBackgroundRepeat}
	{Layer1BackgroundImage}
	{Layer1BackgroundPosition}
	{Layer2BackgroundImage}
	{Layer2BackgroundPosition}
	{Layer3BackgroundImage}
	{Layer3BackgroundPosition}
	{MobileLayer1BackgroundImage}
	{MobileLayer1BackgroundPosition}
	{MobileLayer2BackgroundImage}
	{MobileLayer2BackgroundPosition}
	{MobileLayer3BackgroundImage}
	{MobileLayer3BackgroundPosition}
	{VideoURL}
	{VideoBackupImage}
	{MobileVideoBackupImage}
	{VideoURLMobile}
	{VideoAlignment}
	showVideo={true}
	{IsFullWidthTopSlot}
/>
