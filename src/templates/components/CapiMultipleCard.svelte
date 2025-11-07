<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import AudioIcon from './icons/AudioIcon.svelte';
	import CameraIcon from './icons/CameraIcon.svelte';
	import VideoIcon from './icons/VideoIcon.svelte';
	import CapiMedia from './CapiMedia.svelte';

	export let single: Single;

	const {
		articleHeadline,
		articleUrl,
		articleKicker,
		articleImage,
		audioTag,
		galleryTag,
		videoTag,
	} = single;
</script>

<a class="multiple-card" href={clickMacro(articleUrl)} target="_top">
	<div class="text">
		<h3>
			{#if articleKicker}
				<span class="kicker">{articleKicker && articleKicker}</span><br />
			{/if}
			{#if audioTag}
				<AudioIcon />
			{:else if galleryTag}
				<CameraIcon />
			{:else if videoTag}
				<VideoIcon />
			{/if}
			{articleHeadline}
		</h3>
	</div>
	{#if articleImage}
		<div class="media">
			<div class="hover-overlay" aria-hidden="true" />
			<CapiMedia {articleImage} />
		</div>
	{/if}
</a>

<style lang="scss">
	:global(svg.icon) {
		fill: #767676;
		height: 0.7em;
		width: 1.2em;
		line-height: inherit;
		margin-right: 0.1em;
	}

	.hover-overlay {
		/** Display none until hovering on the card link */
		display: none;
		z-index: 1;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--neutral-0);
		opacity: 0.1;
	}

	.media {
		/** Stop image overflowing its container */
		overflow: hidden;
		/** This is needed to absolutely position the hover overlay */
		position: relative;
	}

	a {
		color: var(--neutral-0);
		text-decoration: none;
		position: relative;

		&:hover {
			.hover-overlay {
				display: block;
			}
			.text {
				text-decoration: underline;
			}
		}
	}

	.multiple-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 100%;
		margin-top: 12px;
		width: auto;

		/** Needed to absolutely position the dividers */
		position: relative;

		@media (max-width: 739px) {
			/* Only show the media for the first card on mobile */
			&:not(:first-of-type) .media {
				display: none;
			}

			/** Top border between cards on mobile */
			&:not(:first-of-type)::before {
				content: '';
				/** Absolutely positioned relative to the card div */
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				border-top: 1px solid var(--neutral-86);
			}
		}

		@media (min-width: 740px) {
			position: relative;

			/** Left border between cards on tablet/desktop */
			&:not(:first-of-type)::before {
				content: '';
				/** Absolutely positioned relative to the card div */
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				border-left: 1px solid var(--neutral-86);
				transform: translateX(-10px);
			}
		}
	}

	.text {
		padding: 0 4px;

		h3 {
			font-size: 1.0625rem;
			font-weight: 700;
			line-height: 1.15;
			font-family: 'GuardianTextSans';
			color: var(--neutral-7);
			padding: 0px;
			margin: 6px 0 8px 0;
		}

		@media (min-width: 740px) {
			margin-bottom: 10px;
		}
	}

	.kicker {
		font-size: 17px;
		color: var(--labs-200);
	}
</style>
