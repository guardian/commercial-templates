<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import Fabric from '$templates/components/Fabric.svelte';

	interface Props {
		TrackingPixel: GAMVariable;
		ResearchPixel: GAMVariable;
		ViewabilityPixel: GAMVariable;
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
	}

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
	}: Props = $props();
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
