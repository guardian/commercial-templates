<script lang="ts">
	import Fabric from '$templates/components/Fabric.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

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
	} = data;
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
