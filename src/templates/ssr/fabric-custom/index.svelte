<script lang="ts">
	import { clickMacro, DEST_URL, type GAMVariable } from '$lib/gam';

	export let ViewabilityTracker: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;
</script>

<base target="_blank" />
<div id="creative">
	<a id="creative-link" href={clickMacro(DEST_URL)}> </a>
</div>
{@html ViewabilityTracker}
{@html thirdPartyJSTracking}

<style lang="scss">
	:global(body) {
		margin: 0;
	}
</style>
