<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import {
		CLICK_MACRO,
		DEST_URL,
		type GAMVariable,
		isValidReplacedVariable,
	} from '$lib/gam';
	import { post } from '$lib/messenger';
	import Pixel from '$templates/components/Pixel.svelte';

	export let showVideo: boolean;
	export let TrackingPixel: string;
	export let ResearchPixel: string;
	export let ViewabilityPixel: string;
	export let BackgroundScrollType: 'parallax' | 'none' | 'fixed';
	export let BackgroundColour: string;
	export let BackgroundImage: string;
	export let BackgroundImagePosition: string;
	export let BackgroundImageRepeat: string;
	export let MobileBackgroundImage: string;
	export let MobileBackgroundImagePosition: string;
	export let MobileBackgroundImageRepeat: string;
	export let Layer1BackgroundImage: string;
	export let Layer1BackgroundPosition: string;
	export let Layer2BackgroundImage: string;
	export let Layer2BackgroundPosition: string;
	export let Layer3BackgroundImage: string;
	export let Layer3BackgroundPosition: string;
	export let MobileLayer1BackgroundImage: string;
	export let MobileLayer1BackgroundPosition: string;
	export let MobileLayer2BackgroundImage: string;
	export let MobileLayer2BackgroundPosition: string;
	export let MobileLayer3BackgroundImage: string;
	export let MobileLayer3BackgroundPosition: string;
	export let VideoURL: GAMVariable;
	export let VideoBackupImage: GAMVariable;
	export let MobileVideoBackupImage: GAMVariable;
	export let VideoURLMobile: GAMVariable;
	export let VideoAlignment: GAMVariable;
	export let isXL = false;

	const isMobile = window.innerWidth < 740;
	const isTablet = window.matchMedia(
		'(min-width: 740px) and (max-width: 979px)',
	).matches;

	const video: Writable<HTMLVideoElement | undefined> = writable();
	let played = false;

	const posterImage = isMobile ? MobileVideoBackupImage : VideoBackupImage;
	const videoSrc = isMobile ? VideoURLMobile : VideoURL;

	onMount(() => {
		if (showVideo) {
			video.subscribe((video) => {
				if (video) {
					if (!VideoURL || !VideoURLMobile) return;

					video.load(); //
					void video.play(); //

					const observer = new IntersectionObserver(
						(entries) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting && !played) {
									video.paused && void video.play();
								} else {
									!video.paused && video.pause();
								}
							});
						},
						{ root: null, rootMargin: '0px', threshold: 0.2 },
					);
					observer.observe(video);
				}
			});
			post({ type: 'resize', value: { height: 524 } });
		} else {
			const [backgroundImage, backgroundPosition, backgroundRepeat] = isMobile
				? [
						MobileBackgroundImage,
						MobileBackgroundImagePosition,
						MobileBackgroundImageRepeat,
					]
				: [BackgroundImage, BackgroundImagePosition, BackgroundImageRepeat];

			const checkScrollType = (scrollType: string): string =>
				scrollType === 'parallax' && (isMobile || isTablet)
					? 'fixed'
					: scrollType;

			post({
				type: 'background',
				value: {
					scrollType: checkScrollType(BackgroundScrollType),
					backgroundColor: BackgroundColour,
					backgroundImage: `url('${backgroundImage}')`,
					backgroundRepeat,
					backgroundPosition,
				},
			});
		}
	});
</script>

<a
	class="fabric-container"
	class:is-parallax={BackgroundScrollType === 'parallax'}
	class:is-xl={isXL}
	href={`${CLICK_MACRO}${DEST_URL}`}
	target="_blank"
>
	<div
		class="layer"
		style:--desktop-background-image={`url('${Layer1BackgroundImage}')`}
		style:--desktop-background-position={Layer1BackgroundPosition}
		style:--mobile-background-image={`url('${MobileLayer1BackgroundImage}')`}
		style:--mobile-background-position={MobileLayer1BackgroundPosition}
	/>
	<div
		class="layer"
		style:--desktop-background-image={`url('${Layer2BackgroundImage}')`}
		style:--desktop-background-position={Layer2BackgroundPosition}
		style:--mobile-background-image={`url('${MobileLayer2BackgroundImage}')`}
		style:--mobile-background-position={MobileLayer2BackgroundPosition}
	/>
	<div
		class="layer"
		style:--desktop-background-image={`url('${Layer3BackgroundImage}')`}
		style:--desktop-background-position={Layer3BackgroundPosition}
		style:--mobile-background-image={`url('${MobileLayer3BackgroundImage}')`}
		style:--mobile-background-position={MobileLayer3BackgroundPosition}
	/>

	{#if showVideo}
		<video
			bind:this={$video}
			muted
			autoplay
			playsinline
			class="video video--{VideoAlignment}"
			class:isMobile
			on:ended={() => (played = true)}
			src={videoSrc}
			poster={posterImage}
		></video>
	{/if}
</a>

{#if isValidReplacedVariable(TrackingPixel)}
	<Pixel src={TrackingPixel} />
{:else if isValidReplacedVariable(ResearchPixel)}
	<Pixel src={ResearchPixel} />
{:else if isValidReplacedVariable(ViewabilityPixel)}
	<Pixel src={ViewabilityPixel} />
{/if}

<style lang="scss">
	:global(body) {
		background-color: var(--background-color);
		margin: 0;
	}
	.isMobile {
		width: 740px;
	}

	.video,
	.poster,
	.alt,
	.layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.video {
		width: 1920px;
		height: 250px;
	}

	.video--left {
		top: 50%;
		left: 0%;
		transform: translate(0%, -50%);
	}

	.video--right {
		top: 50%;
		right: 0%;
		left: unset;
		transform: translate(0%, -50%);
	}

	.video--center {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.fabric-container {
		display: block;
		position: relative;
		text-decoration: none;
		margin: 0 auto;
		overflow: hidden;
		height: 250px;

		&.is-xl {
			height: 500px;
		}
		&.is-xl .layer {
			height: 500px;
		}

		&.is-parallax .layer {
			background-size: auto;
		}

		@media (min-width: 740px) {
			max-width: 740px;
		}
		@media (min-width: 980px) {
			max-width: 980px;
		}
		@media (min-width: 1140px) {
			max-width: 1140px;
		}
		@media (min-width: 1300px) {
			max-width: 1300px;
		}
	}

	.layer {
		width: 100%;
		height: 250px;
		position: absolute;
		top: 0;
		left: 0;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: var(--mobile-background-image);
		background-position: var(--mobile-background-position);
	}

	@media (min-width: 740px) {
		.layer {
			background-image: var(--desktop-background-image);
			background-position: var(--desktop-background-position);
		}
	}
</style>
