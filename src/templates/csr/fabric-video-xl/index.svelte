<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import Fabric from '$templates/components/Fabric.svelte';

	export let TrackingPixel: GAMVariable;
	export let ResearchPixel: GAMVariable;
	export let ViewabilityPixel: GAMVariable;

	export let BackgroundColour: GAMVariable;
	export let BackgroundImage: GAMVariable;
	export let BackgroundPosition: GAMVariable;
	export let BackgroundRepeat: GAMVariable;
	export let Layer1BackgroundImage: GAMVariable;
	export let Layer1BackgroundPosition: GAMVariable;
	export let Layer2BackgroundImage: GAMVariable;
	export let Layer2BackgroundPosition: GAMVariable;
	export let Layer3BackgroundImage: GAMVariable;
	export let Layer3BackgroundPosition: GAMVariable;

	export let MobileBackgroundImage: GAMVariable;
	export let MobileBackgroundPosition: GAMVariable;
	export let MobileBackgroundRepeat: GAMVariable;
	export let MobileLayer1BackgroundImage: GAMVariable;
	export let MobileLayer1BackgroundPosition: GAMVariable;
	export let MobileLayer2BackgroundImage: GAMVariable;
	export let MobileLayer2BackgroundPosition: GAMVariable;
	export let MobileLayer3BackgroundImage: GAMVariable;
	export let MobileLayer3BackgroundPosition: GAMVariable;

	export let VideoURL: GAMVariable;
	export let VideoBackupImage: GAMVariable;
	export let MobileVideoBackupImage: GAMVariable;
	export let VideoURLMobile: GAMVariable;
	export let VideoAlignment: GAMVariable;
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
/>
