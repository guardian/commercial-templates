<script lang="ts">
	import { getTag, insertTag } from '$lib/fabric-custom-shared';
	import { addTrackingPixel, clickMacro, DEST_URL } from '$lib/gam';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { building } from '$app/environment';

	export let data: PageData;

	let { ViewabilityTracker, DapAssetsFolder, TrackingPixel, ResearchPixel } =
		data;

	let creativeLink: HTMLAnchorElement;

	onMount(async () => {
		try {
			const tag = await getTag(DapAssetsFolder);

			insertTag(tag, creativeLink);
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

<base target="_blank" />
<div id="creative">
	<a id="creative-link" href={clickMacro(DEST_URL)} bind:this={creativeLink}>
		<!-- Creative will be inserted here -->
	</a>
</div>
<div id="js-fabric-custom"></div>
{@html ViewabilityTracker}

<!-- This will only add the GAM tag when pre-rendering as a raw string, these JS tags have been known to cause issues when injected into svelte's compiled JS by GAM -->
{#if building}
	[%thirdPartyJSTracking%]
{/if}

<style lang="scss">
	:global(body) {
		margin: 0;
	}
</style>
