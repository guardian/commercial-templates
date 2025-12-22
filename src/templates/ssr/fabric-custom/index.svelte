<script lang="ts">
	import { type GAMVariable } from '$lib/gam';
	import FabricCustom from '$templates/components/FabricCustom.svelte';

	interface Props {
		ViewabilityTracker: GAMVariable;
		thirdPartyJSTracking: GAMVariable;
	}

	let { ViewabilityTracker, thirdPartyJSTracking }: Props = $props();
</script>

<FabricCustom {ViewabilityTracker} {thirdPartyJSTracking} />
