<script lang="ts">
	import { palette } from '@guardian/source/foundations';
	import type { MediaType } from '$lib/types/media';

	interface Props {
		image?: string;
		videoSource?: string;
		posterImage?: string;
		mediaType: MediaType;
		backgroundColor: string;
	}

	let {
		videoSource,
		posterImage,
		image,
		mediaType,
		backgroundColor = palette.neutral[100],
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="slide" style:--backgroundColor={backgroundColor}>
	{#if mediaType == 'video'}
		<video
			autoplay
			muted
			loop
			playsinline
			src={videoSource}
			poster={posterImage}
		></video>
	{/if}

	{#if mediaType == 'image'}
		<img src={image} alt="" />
	{/if}
</div>

<style lang="scss">
	.slide {
		--border-radius: 20px;
		--slide-width: 330px;
		--slide-height: 330px;
	}

	.slide {
		border-radius: var(--border-radius);
		display: flex;
		flex: 1 0 var(--slide-width);
		width: 100%;
		min-width: var(--slide-width);
		height: var(--slide-height);
		justify-content: center;
		align-items: center;
		background-color: var(--backGroundColor);
		transition:
			opacity 0.3s ease-in-out,
			transform 0.3s ease-in-out;
		scroll-snap-align: center;

		&:first-child {
			padding-left: 10px;
		}
	}

	video {
		border-radius: var(--border-radius);
	}
</style>
