<script lang="ts">
	import { getTag, insertTag } from '$lib/fabric-custom-shared';
	import { addTrackingPixel } from '$lib/gam';
	import { post } from '$lib/messenger';
	import FabricCustom from '$lib/components/FabricCustom.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let {
		ViewabilityTracker,
		thirdPartyJSTracking,
		DapAssetsFolder,
		TrackingPixel,
		ResearchPixel,
	} = data;

	onMount(async () => {
		try {
			const tag = await getTag(DapAssetsFolder);

			insertTag(tag);
			post({
				type: 'resize',
				value: { height: document.getElementById('creative')!.offsetHeight },
			});
		} catch (error) {
			console.error('Error fetching or inserting tag:', error);
		}

		if (TrackingPixel) {
			addTrackingPixel(TrackingPixel);
		}

		if (ResearchPixel) {
			addTrackingPixel(ResearchPixel);
		}
	});
</script>

<FabricCustom {ViewabilityTracker} {thirdPartyJSTracking} />
