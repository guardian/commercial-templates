<script lang="ts">
	import { clickMacro, DEST_URL } from '$lib/gam';

	export let ViewabilityTracker: string;
	export let thirdPartyJSTracking: string;
</script>

<base target="_blank" />
<div id="creative">
	<a id="creative-link" href={clickMacro(DEST_URL)}> </a>
</div>
<div id="js-fabric-custom"></div>
{@html ViewabilityTracker}
{@html thirdPartyJSTracking}

<style lang="scss">
	:global(body) {
		margin: 0;
	}
</style>
