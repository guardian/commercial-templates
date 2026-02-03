<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { post } from '$lib/messenger';
	import { building } from '$app/environment';

	export let data: PageData;

	let {
		BackgroundImage,
		VideoSource,
		TrackingPixel,
		ResearchPixel,
		ViewabilityTracker,
	} = data;

	onMount(() => {
		// this will tell frontend to add the 'ad-slot--interscroller' class to the ad slot
		post({
			type: 'type',
			value: 'interscroller',
		});

		post({
			type: 'background',
			value: {
				scrollType: 'interscroller',
				backgroundImage: `url('${BackgroundImage}')`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
				ctaUrl: `%%CLICK_URL_UNESC%%%%DEST_URL%%`,
				videoSource: VideoSource,
			},
		});

		post({
			type: 'resize',
			value: {
				height: '85vh',
			},
		});
	});
</script>

<div class="creative--interscroller">
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src={TrackingPixel}
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src={ResearchPixel}
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src={ViewabilityTracker}
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- This will only add the GAM tag when pre-rendering as a raw string, these JS tags have been known to cause issues when injected into svelte's compiled JS by GAM -->
	{#if building}
		[%thirdPartyJSTracking%]
	{/if}
</div>

<style lang="scss">
	.creative--interscroller {
		margin-top: 24px;
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
