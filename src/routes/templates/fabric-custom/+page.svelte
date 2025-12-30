<script lang="ts">
	import { getTag, insertTag } from '$lib/fabric-custom-shared';
	import { addTrackingPixel } from '$lib/gam';
	import { post } from '$lib/messenger';
	import FabricCustom from '$templates/components/FabricCustom.svelte';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

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
