<script lang="ts">
	import { type GAMVariable } from '$lib/gam';
	import FabricCustom from '$templates/components/FabricCustom.svelte';

	export let ViewabilityTracker: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;
</script>

<FabricCustom {ViewabilityTracker} {thirdPartyJSTracking} />
