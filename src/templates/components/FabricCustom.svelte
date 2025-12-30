<script lang="ts">
	import { clickMacro, DEST_URL, type GAMVariable } from '$lib/gam';

	interface Props {
		ViewabilityTracker: GAMVariable;
		thirdPartyJSTracking: GAMVariable;
	}

	let { ViewabilityTracker, thirdPartyJSTracking }: Props = $props();
</script>

<base target="_blank" />
<div id="creative">
	<a
		id="creative-link"
		href={clickMacro(DEST_URL)}
		title="Click Through URL"
		rel="external"
	>
	</a>
</div>
<div id="js-fabric-custom"></div>
{@html ViewabilityTracker}
{@html thirdPartyJSTracking}

<style lang="scss">
	:global(body) {
		margin: 0;
	}
</style>
