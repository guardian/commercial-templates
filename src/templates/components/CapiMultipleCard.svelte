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
	<h3 class="text">
		{#if articleKicker}
			<span class="kicker">{articleKicker && articleKicker}</span><br />
		{/if}
		<span class="headline">
			{#if audioTag}
				<AudioIcon />
			{:else if galleryTag}
				<CameraIcon />
			{:else if videoTag}
				<VideoIcon />
			{/if}
			{articleHeadline}
		</span>
	</h3>
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

		@media (max-width: 739.9px) {
			width: 120px;
			height: auto;
			flex-shrink: 0;
			margin-top: 8px;
		}
	}

	a {
		color: var(--neutral-0);
		text-decoration: none;
		position: relative;

		&:hover {
			.hover-overlay {
				display: block;
			}
			.headline {
				text-decoration: underline;
			}
		}
	}

	.multiple-card {
		display: flex;
		justify-content: space-between;
		flex-basis: 100%;
		width: auto;
		margin-bottom: 8px;

		/** Needed to absolutely position the dividers */
		position: relative;

		@media (max-width: 739.9px) {
			flex-direction: row-reverse;
			align-items: flex-start;
			column-gap: 10px;

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
			margin-bottom: unset;
			flex-direction: column;

			/** Left border between cards on tablet/desktop */
			&:not(:first-of-type)::before {
				content: '';
				/** Absolutely positioned relative to the card div */
				position: absolute;
				top: 8px;
				left: 0;
				bottom: 0;
				border-left: 1px solid var(--neutral-86);
				transform: translateX(-10px);
			}
		}
	}

	.text {
		margin: 0 0 4px;

		@media (min-width: 740px) {
			margin-bottom: 10px;
		}
	}

	.headline {
		font-size: 1.0625rem;
		font-weight: 700;
		line-height: 1.15;
		font-family: 'GuardianTextSans';
		color: var(--neutral-7);
		padding: 0px;

		@media (min-width: 980px) {
			font-size: 1.25rem;
		}
	}

	.kicker {
		font-size: 14px;
		font-weight: 400;
		color: var(--labs-200);
	}
</style>
