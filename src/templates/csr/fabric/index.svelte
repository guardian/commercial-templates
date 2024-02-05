<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import Fabric from '$templates/components/Fabric.svelte';

	export let Trackingpixel: GAMVariable;
	export let Researchpixel: GAMVariable;
	export let Viewabilitypixel: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;

	export let BackgroundScrollType: GAMVariable<'parallax' | 'none' | 'fixed'>;
	export let BackgroundColour: GAMVariable;
	export let BackgroundImage: GAMVariable;
	export let BackgroundImagePosition: GAMVariable;
	export let BackgroundImageRepeat: GAMVariable;
	export let MobileBackgroundImage: GAMVariable;
	export let MobileBackgroundImagePosition: GAMVariable;
	export let MobileBackgroundImageRepeat: GAMVariable;

	export let Layer1BackgroundImage: GAMVariable;
	export let Layer1BackgroundPosition: GAMVariable;
	export let Layer2BackgroundImage: GAMVariable;
	export let Layer2BackgroundPosition: GAMVariable;
	export let Layer3BackgroundImage: GAMVariable;
	export let Layer3BackgroundPosition: GAMVariable;

	export let MobileLayer1BackgroundImage: GAMVariable;
	export let MobileLayer1BackgroundPosition: GAMVariable;
	export let MobileLayer2BackgroundImage: GAMVariable;
	export let MobileLayer2BackgroundPosition: GAMVariable;
	export let MobileLayer3BackgroundImage: GAMVariable;
	export let MobileLayer3BackgroundPosition: GAMVariable;
</script>

<Fabric
	{Trackingpixel}
	{Researchpixel}
	{Viewabilitypixel}
	{thirdPartyJSTracking}
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
/>
