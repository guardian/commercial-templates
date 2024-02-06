<script lang="ts">
	import { clickMacro, DEST_URL, type GAMVariable } from '$lib/gam';
	import AdvertisementLabel from '$templates/components/AdvertisementLabel.svelte';
	import Pixel from '$templates/components/Pixel.svelte';

	export let TrackingPixel: GAMVariable;
	export let ResearchPixel: GAMVariable;
	export let ViewabilityTracker: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;
</script>

<div id="creative">
	<AdvertisementLabel />
	<a id="creative-link" href={clickMacro(DEST_URL)}> </a>
</div>
<Pixel src={TrackingPixel} />
<Pixel src={ResearchPixel} />
{@html ViewabilityTracker}
{@html thirdPartyJSTracking}

<style lang="scss">
	:global(body) {
		margin: 0;
	}
</style>
