<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import {
		clickMacro,
		DEST_URL,
		type GAMVariable,
		isValidReplacedVariable,
	} from '$lib/gam';
	import { post } from '$lib/messenger';
	import Pixel from '$templates/components/Pixel.svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { onMount } from 'svelte';

	interface Props {
		TrackingPixel: string;
		ResearchPixel: string;
		ViewabilityPixel: string;
		BackgroundScrollType?: 'parallax' | 'none' | 'fixed';
		BackgroundColour: string;
		BackgroundImage: string;
		BackgroundImagePosition: string;
		BackgroundImageRepeat: string;
		MobileBackgroundImage: string;
		MobileBackgroundImagePosition: string;
		MobileBackgroundImageRepeat: string;
		Layer1BackgroundImage: string;
		Layer1BackgroundPosition: string;
		Layer2BackgroundImage: string;
		Layer2BackgroundPosition: string;
		Layer3BackgroundImage: string;
		Layer3BackgroundPosition: string;
		MobileLayer1BackgroundImage: string;
		MobileLayer1BackgroundPosition: string;
		MobileLayer2BackgroundImage: string;
		MobileLayer2BackgroundPosition: string;
		MobileLayer3BackgroundImage: string;
		MobileLayer3BackgroundPosition: string;
		VideoURL?: GAMVariable | undefined;
		VideoBackupImage?: GAMVariable | undefined;
		MobileVideoBackupImage?: GAMVariable | undefined;
		VideoURLMobile?: GAMVariable | undefined;
		VideoAlignment?: GAMVariable | undefined;
		showVideo?: boolean;
		isXL?: boolean;
		IsFullWidthTopSlot: GAMVariable<'yes' | 'no'>;
	}

	let {
		TrackingPixel,
		ResearchPixel,
		ViewabilityPixel,
		BackgroundScrollType = 'none',
		BackgroundColour,
		BackgroundImage,
		BackgroundImagePosition,
		BackgroundImageRepeat,
		MobileBackgroundImage,
		MobileBackgroundImagePosition,
		MobileBackgroundImageRepeat,
		Layer1BackgroundImage,
		Layer1BackgroundPosition,
		Layer2BackgroundImage,
		Layer2BackgroundPosition,
		Layer3BackgroundImage,
		Layer3BackgroundPosition,
		MobileLayer1BackgroundImage,
		MobileLayer1BackgroundPosition,
		MobileLayer2BackgroundImage,
		MobileLayer2BackgroundPosition,
		MobileLayer3BackgroundImage,
		MobileLayer3BackgroundPosition,
		VideoURL = undefined,
		VideoBackupImage = undefined,
		MobileVideoBackupImage = undefined,
		VideoURLMobile = undefined,
		VideoAlignment = undefined,
		showVideo = false,
		isXL = false,
		IsFullWidthTopSlot,
	}: Props = $props();

	const isMobile = new MediaQuery('(max-width: 739px)').current;
	const isTablet = new MediaQuery('(min-width: 740px) and (max-width: 979px)')
		.current;

	let video: HTMLVideoElement | undefined = $state();
	let played = $state(false);

	let posterImage = $derived(
		isMobile ? MobileVideoBackupImage : VideoBackupImage,
	);
	let videoSrc = $derived(isMobile ? VideoURLMobile : VideoURL);

	$effect(() => {
		if (video) {
			if (!VideoURL || !VideoURLMobile) return;

			post({
				type: 'init-video',
				value: '',
			});

			video.load();

			video.ontimeupdate = function () {
				if (!video) return;
				const percent = Math.round(100 * (video.currentTime / video.duration));
				post({ type: 'video-progress', value: { progress: percent } });
			};

			void video.play();

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (!video) return;
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

	onMount(() => {
		if (showVideo) {
			if (isXL) {
				post({ type: 'resize', value: { height: 524 } });
			}
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
	class:is-top-slot-video={IsFullWidthTopSlot === 'yes'}
	href={clickMacro(DEST_URL)}
	target="_blank"
	rel="external"
>
	<div
		class="layer"
		style:--desktop-background-image={`url('${Layer1BackgroundImage}')`}
		style:--desktop-background-position={Layer1BackgroundPosition}
		style:--mobile-background-image={`url('${MobileLayer1BackgroundImage}')`}
		style:--mobile-background-position={MobileLayer1BackgroundPosition}
	></div>
	<div
		class="layer"
		style:--desktop-background-image={`url('${Layer2BackgroundImage}')`}
		style:--desktop-background-position={Layer2BackgroundPosition}
		style:--mobile-background-image={`url('${MobileLayer2BackgroundImage}')`}
		style:--mobile-background-position={MobileLayer2BackgroundPosition}
	></div>
	<div
		class="layer"
		style:--desktop-background-image={`url('${Layer3BackgroundImage}')`}
		style:--desktop-background-position={Layer3BackgroundPosition}
		style:--mobile-background-image={`url('${MobileLayer3BackgroundImage}')`}
		style:--mobile-background-position={MobileLayer3BackgroundPosition}
	></div>

	{#if showVideo}
		<video
			bind:this={video}
			muted
			autoplay
			playsinline
			class="video video--{VideoAlignment}"
			class:is-top-slot-video={IsFullWidthTopSlot === 'yes'}
			class:is-mobile={isMobile}
			onended={() => (played = true)}
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
		width: 1300px;
		height: 250px;

		&.is-mobile {
			width: 740px;
		}

		.is-xl & {
			height: 500px;
		}

		&.is-top-slot-video {
			width: 1920px;
		}
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

		&.is-top-slot-video {
			@media (min-width: 1300px) {
				max-width: 1920px;
			}
		}
	}

	.layer {
		z-index: 1;
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
