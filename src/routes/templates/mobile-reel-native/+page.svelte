<script lang="ts">
	import { onMount } from 'svelte';
	import { post } from '$lib/messenger';
	import { building } from '$app/environment';
	import type { PageData } from './$types';
	import { CACHE_BUST } from '$lib/gam';

	import MobileReelItem from '$lib/components/MobileReelItem.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let {
		Header,
		BackgroundColor,
		SlideOne,
		SlideOneVideo,
		SlideOneMediaType,
		SlideTwo,
		SlideTwoVideo,
		SlideTwoMediaType,
		SlideThree,
		SlideThreeVideo,
		SlideThreeMediaType,
		SlideFour,
		SlideFourVideo,
		SlideFourMediaType,
		SlideFive,
		SlideFiveVideo,
		SlideFiveMediaType,
		TrackingPixel,
		ResearchPixel,
		ViewabilityTracker,
	} = data;

	const adHeight: string = '560px';

	onMount(() => {
		post({
			type: 'resize',
			value: {
				height: adHeight,
			},
		});
	});
</script>

<div class="ad-container" style:--backgroundColor={BackgroundColor}>
	<div class="header">
		<img src={Header} alt="" />
	</div>
	<div
		role="region"
		aria-label="Image carousel"
		aria-live="polite"
		class="carousel carousel--container"
	>
		<div class="slides">
			<MobileReelItem
				image={SlideOne}
				videoSource={SlideOneVideo}
				posterImage={''}
				mediaType={SlideOneMediaType}
			/>
			<MobileReelItem
				image={SlideTwo}
				videoSource={SlideTwoVideo}
				posterImage={''}
				mediaType={SlideTwoMediaType}
			/>
			<MobileReelItem
				image={SlideThree}
				videoSource={SlideThreeVideo}
				posterImage={''}
				mediaType={SlideThreeMediaType}
			/>

			{#if SlideFour != ''}
				<MobileReelItem
					image={SlideFour}
					videoSource={SlideFourVideo}
					posterImage={''}
					mediaType={SlideFourMediaType}
				/>
			{/if}

			{#if SlideFive != ''}
				<MobileReelItem
					image={SlideFive}
					videoSource={SlideFiveVideo}
					posterImage={''}
					mediaType={SlideFiveMediaType}
				/>
			{/if}
			<div class="space"></div>
		</div>
	</div>
</div>

<!-- svelte-ignore a11y_missing_attribute -->
<img
	src={TrackingPixel}
	class="creative__pixel creative__pixel--displayNone"
	aria-hidden="true"
/>
<!-- svelte-ignore a11y_missing_attribute -->
<img
	src={ResearchPixel}
	class="creative__pixel creative__pixel--displayNone"
	aria-hidden="true"
/>
<!-- svelte-ignore a11y_missing_attribute -->
<img
	src={ViewabilityTracker}
	class="creative__pixel creative__pixel--displayNone"
	aria-hidden="true"
/>

<style lang="scss">
	.carousel {
		--border-radius: 20px;
		--neutral-grey: #cacaca;
		--slide-gap: 0 12px;
	}

	.ad-container {
		width: 100%;
		max-width: 739px;
		height: 560px;
		overflow: hidden;
		background: var(--backgroundColor);
	}

	.space {
		flex: 1 0 36px;
		height: 100%;
	}

	.carousel--container {
		width: 100%;
		display: block;
		padding-block-start: 36px;
		padding-block-end: 36px;
		padding-inline-start: 36px;

		& .slides {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			width: 100%;
			height: 100%;
			max-height: 344px;

			gap: 0 12px;
			scroll-snap-type: x mandatory;
			overflow-x: scroll;
		}
	}

	.header {
		width: 100%;
		max-width: 432px;
		height: 157px;
		display: flex;
		justify-content: center;
		align-items: center;

		& img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
