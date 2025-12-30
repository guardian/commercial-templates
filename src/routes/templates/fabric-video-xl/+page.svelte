<script lang="ts">
	import Fabric from '$templates/components/Fabric.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let {
		TrackingPixel,
		ResearchPixel,
		ViewabilityPixel,
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
	} = data;
</script>

<Fabric
	{TrackingPixel}
	{ResearchPixel}
	{ViewabilityPixel}
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
	isXL={true}
	showVideo={true}
	IsFullWidthTopSlot={'no'}
/>
