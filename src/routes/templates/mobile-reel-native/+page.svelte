<script lang="ts">
	import { onMount } from 'svelte';
	import { post } from '$lib/messenger';
	import { building } from '$app/environment';
	import type { PageData } from './$types';
	import { clickMacro, DEST_URL } from '$lib/gam';

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
		PosterImageOne,
		PosterImageTwo,
		PosterImageThree,
		PosterImageFour,
		PosterImageFive,
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
	<a class="mobile-container" href={clickMacro(DEST_URL)} target="_blank">
		<div class="header">
			<img src={Header} alt="" />
		</div>
	</a>
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
				posterImage={PosterImageOne}
				mediaType={SlideOneMediaType}
			/>
			<MobileReelItem
				image={SlideTwo}
				videoSource={SlideTwoVideo}
				posterImage={PosterImageTwo}
				mediaType={SlideTwoMediaType}
			/>
			<MobileReelItem
				image={SlideThree}
				videoSource={SlideThreeVideo}
				posterImage={PosterImageThree}
				mediaType={SlideThreeMediaType}
			/>

			{#if SlideFour != ''}
				<MobileReelItem
					image={SlideFour}
					videoSource={SlideFourVideo}
					posterImage={PosterImageFour}
					mediaType={SlideFourMediaType}
				/>
			{/if}

			{#if SlideFive != ''}
				<MobileReelItem
					image={SlideFive}
					videoSource={SlideFiveVideo}
					posterImage={PosterImageFive}
					mediaType={SlideFiveMediaType}
				/>
			{/if}
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

	.carousel--container {
		width: 100%;
		display: block;
		padding-block-start: 36px;
		padding-block-end: 36px;
		padding-inline-start: 0px;

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
