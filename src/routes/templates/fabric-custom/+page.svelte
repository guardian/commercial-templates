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

	onMount(() => {
		getTag(DapAssetsFolder)
			.then((tag) => {
				insertTag(tag);
				post({
					type: 'resize',
					value: { height: document.getElementById('creative')!.offsetHeight },
				});
			})
			.catch((e) => {
				console.error(e);
			});

		if (TrackingPixel) {
			addTrackingPixel(TrackingPixel);
		}

		if (ResearchPixel) {
			addTrackingPixel(ResearchPixel);
		}
	});
</script>

<div></div>

<FabricCustom {ViewabilityTracker} {thirdPartyJSTracking} />
