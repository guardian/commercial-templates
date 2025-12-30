<script lang="ts">
	import FabricCustom from '$templates/components/FabricCustom.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let { ViewabilityTracker, thirdPartyJSTracking } = data;
</script>

<FabricCustom {ViewabilityTracker} {thirdPartyJSTracking} />
