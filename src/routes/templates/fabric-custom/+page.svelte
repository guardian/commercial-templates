<script lang="ts">
	import { getTag, insertTag } from '$lib/fabric-custom-shared';
	import { addTrackingPixel, clickMacro, DEST_URL } from '$lib/gam';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { building } from '$app/environment';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let creativeLink: HTMLAnchorElement | undefined = $state();

	onMount(async () => {
		try {
			const tag = await getTag(data.DapAssetsFolder);

			if (creativeLink) insertTag(tag, creativeLink);
		} catch (error) {
			console.error('Error fetching or inserting tag:', error);
		}

		if (data.TrackingPixel) {
			addTrackingPixel(data.TrackingPixel);
		}

		if (data.ResearchPixel) {
			addTrackingPixel(data.ResearchPixel);
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
{@html data.ViewabilityTracker}

<!-- This will only add the GAM tag when pre-rendering as a raw string, these JS tags have been known to cause issues when injected into svelte's compiled JS by GAM -->
{#if building}
	[%thirdPartyJSTracking%]
{/if}

<style lang="scss">
	:global(body) {
		margin: 0;
	}

	#creative {
		// This is so that the creative div takes up space even before the creative is injected, so that google's `fluid` tag will know the height even before the creative is injected and can size the creative correctly from the start
		min-height: 250px;
	}
</style>
