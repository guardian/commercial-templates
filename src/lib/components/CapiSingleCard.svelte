<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import CapiMedia from './CapiMedia.svelte';
	import AudioIcon from './icons/AudioIcon.svelte';
	import CameraIcon from './icons/CameraIcon.svelte';
	import VideoIcon from './icons/VideoIcon.svelte';

	export let single: Single;

	const {
		articleHeadline,
		articleUrl,
		articleText,
		articleKicker,
		articleImage,
		audioTag,
		galleryTag,
		videoTag,
	} = single;
</script>

<a class="single-card" href={clickMacro(articleUrl)} target="_top">
	<div class="text">
		<h2>
			{#if articleKicker}
				<span class="kicker">{articleKicker}</span><br />
			{/if}
			{#if audioTag}
				<AudioIcon />
			{:else if galleryTag}
				<CameraIcon />
			{:else if videoTag}
				<VideoIcon />
			{/if}
			{articleHeadline}
		</h2>
		<p>{articleText}</p>
	</div>
	<div class="media">
		{#if articleImage}
			<div class="hover-overlay" aria-hidden="true" />
			<CapiMedia {articleImage} />
		{/if}
	</div>
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

	.single-card {
		color: var(--neutral-0);
		text-decoration: none;
		position: relative;

		margin: 8px 0;
		display: grid;

		gap: 20px;

		&:hover {
			.hover-overlay {
				display: block;
			}
			.text :not(p) {
				text-decoration: underline;
			}
		}

		@media (min-width: 740px) {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1140px) {
			margin: 0 0 8px 20px;
			position: relative;
			::before {
				content: '';
				position: absolute;
				top: 0;
				left: -10px;
				bottom: 0;
				border-left: 1px solid var(--neutral-86);
			}
		}
	}

	.text {
		padding: 0;

		h2 {
			margin: 0;
			padding: 0 0 10px;
			font-size: 1.25rem;
			line-height: 1.15;
			font-family: 'GuardianTextSans';
			color: var(--neutral-7);
			@media (min-width: 980px) {
				font-size: 1.5rem;
			}
		}

		p {
			display: none;
			margin: 0;
			padding: 0;
			color: var(--neutral-38);
			@media (min-width: 740px) {
				display: block;
			}
		}
	}

	.kicker {
		font-size: 16px;
		color: var(--labs-200);
	}
</style>
