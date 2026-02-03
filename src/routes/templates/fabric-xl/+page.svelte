<script lang="ts">
	import Fabric from '$lib/components/Fabric.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

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
	} = data;
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
