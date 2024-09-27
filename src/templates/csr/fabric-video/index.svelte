<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import {
		CLICK_MACRO,
		DEST_URL,
		type GAMVariable,
		isValidReplacedVariable,
	} from '$lib/gam';
	import Pixel from '$templates/components/Pixel.svelte';

	export let Trackingpixel: GAMVariable;
	export let Researchpixel: GAMVariable;
	export let Viewabilitypixel: GAMVariable;

	export let BackgroundScrollType: GAMVariable<'parallax' | 'none' | 'fixed'>;

	export let Layer1BackgroundImage: GAMVariable;
	export let Layer1BackgroundPosition: GAMVariable;
	export let Layer2BackgroundImage: GAMVariable;
	export let Layer2BackgroundPosition: GAMVariable;
	export let Layer3BackgroundImage: GAMVariable;
	export let Layer3BackgroundPosition: GAMVariable;
	export let MobileLayer1BackgroundImage: GAMVariable;
	export let MobileLayer1BackgroundPosition: GAMVariable;
	export let MobileLayer2BackgroundImage: GAMVariable;
	export let MobileLayer2BackgroundPosition: GAMVariable;
	export let MobileLayer3BackgroundImage: GAMVariable;
	export let MobileLayer3BackgroundPosition: GAMVariable;
	export let VideoURL: GAMVariable;
	export let VideoBackupImage: GAMVariable;
	export let MobileVideoBackupImage: GAMVariable;
	export let VideoURLMobile: GAMVariable;
	export let VideoAlignment: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;
	export let isXL = false;

	const isMobile = window.innerWidth < 740;

	const video: Writable<HTMLVideoElement | undefined> = writable();

	let played = false;

	// Add video source
	// Add video poster image
	const posterImage = isMobile ? MobileVideoBackupImage : VideoBackupImage;
	const videoSrc = isMobile ? VideoURLMobile : VideoURL;

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
</a>

{#if isValidReplacedVariable(Trackingpixel)}
	<Pixel src={Trackingpixel} />
{:else if isValidReplacedVariable(Researchpixel)}
	<Pixel src={Researchpixel} />
{:else if isValidReplacedVariable(Viewabilitypixel)}
	<Pixel src={Viewabilitypixel} />
{/if}

{thirdPartyJSTracking}

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
