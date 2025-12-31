<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { post } from '$lib/messenger';

	export let data: PageData;

	let {
		BackgroundImage,
		VideoSource,
		TrackingPixel,
		ResearchPixel,
		ViewabilityTracker,
		thirdPartyJSTracking,
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
	{@html thirdPartyJSTracking}
</div>

<style lang="scss">
	.creative--interscroller {
		margin-top: 24px;
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
