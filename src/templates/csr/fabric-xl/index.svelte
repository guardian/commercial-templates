<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import Fabric from '$templates/components/Fabric.svelte';

	interface Props {
		TrackingPixel: GAMVariable;
		ResearchPixel: GAMVariable;
		ViewabilityPixel: GAMVariable;
		BackgroundScrollType: GAMVariable<'parallax' | 'none' | 'fixed'>;
		BackgroundColour: GAMVariable;
		BackgroundImage: GAMVariable;
		BackgroundImagePosition: GAMVariable;
		BackgroundImageRepeat: GAMVariable;
		Layer1BackgroundImage: GAMVariable;
		Layer1BackgroundPosition: GAMVariable;
		Layer2BackgroundImage: GAMVariable;
		Layer2BackgroundPosition: GAMVariable;
		Layer3BackgroundImage: GAMVariable;
		Layer3BackgroundPosition: GAMVariable;
		MobileBackgroundImage: GAMVariable;
		MobileBackgroundImagePosition: GAMVariable;
		MobileBackgroundImageRepeat: GAMVariable;
		MobileLayer1BackgroundImage: GAMVariable;
		MobileLayer1BackgroundPosition: GAMVariable;
		MobileLayer2BackgroundImage: GAMVariable;
		MobileLayer2BackgroundPosition: GAMVariable;
		MobileLayer3BackgroundImage: GAMVariable;
		MobileLayer3BackgroundPosition: GAMVariable;
	}

	let {
		TrackingPixel,
		ResearchPixel,
		ViewabilityPixel,
		BackgroundScrollType,
		BackgroundColour,
		BackgroundImage,
		BackgroundImagePosition,
		BackgroundImageRepeat,
		Layer1BackgroundImage,
		Layer1BackgroundPosition,
		Layer2BackgroundImage,
		Layer2BackgroundPosition,
		Layer3BackgroundImage,
		Layer3BackgroundPosition,
		MobileBackgroundImage,
		MobileBackgroundImagePosition,
		MobileBackgroundImageRepeat,
		MobileLayer1BackgroundImage,
		MobileLayer1BackgroundPosition,
		MobileLayer2BackgroundImage,
		MobileLayer2BackgroundPosition,
		MobileLayer3BackgroundImage,
		MobileLayer3BackgroundPosition,
	}: Props = $props();
</script>

<Fabric
	{TrackingPixel}
	{ResearchPixel}
	{ViewabilityPixel}
	{BackgroundScrollType}
	{BackgroundColour}
	{BackgroundImage}
	{BackgroundImagePosition}
	{BackgroundImageRepeat}
	{MobileBackgroundImage}
	{MobileBackgroundImagePosition}
	{MobileBackgroundImageRepeat}
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
	IsFullWidthTopSlot={'no'}
	isXL={true}
/>
