<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { CapiHostedCard } from '$lib/types/capi';
	import AudioIcon from './icons/AudioIcon.svelte';
	import CameraIcon from './icons/CameraIcon.svelte';
	import VideoIcon from './icons/VideoIcon.svelte';

	export let card: CapiHostedCard;

	const { headline, image, url, audioTag, galleryTag, videoTag } = card;

	const pictureSupported = image?.sources.length && 'srcset' in new Image();
</script>

<a href={clickMacro(url)} target="_top">
	<div class="media">
		{#if pictureSupported}
			<picture>
				{#each image.sources.filter((source) => source.minWidth === '0') as source}
					<source
						media={`(min-width: ${source.minWidth}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${source.minWidth}px) and (min-resolution: 120dpi)`}
						srcset={source.hidpiSrcset}
						sizes={source.sizes}
					/>

					<source
						media={`(min-width: ${source.minWidth}px)`}
						srcset={source.lodpiSrcset}
						sizes={source.sizes}
					/>
				{/each}
				<img src={image.backupSrc} alt="" />
			</picture>
		{:else if image?.backupSrc}
			<img src={image.backupSrc} alt="" />
		{/if}
	</div>
	<h2>
		{#if audioTag}
			<AudioIcon />
		{:else if galleryTag}
			<CameraIcon />
		{:else if videoTag}
			<VideoIcon />
		{/if}
		{headline}
	</h2>
</a>

<style lang="scss">
	a {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		max-height: 400px;
		max-width: 700px;
		text-decoration: none;
		background-color: var(--brand-colour);
	}

	a:hover,
	a:focus {
		opacity: 0.9;
	}

	a:nth-child(n + 2) {
		img {
			display: none;
		}
	}

	picture,
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	h2 {
		margin: 0;
		padding: 0.1em 0.3em 0.9em;
		color: #fff;
		font-size: 1.15rem;
		line-height: 130%;
		font-weight: 400;
		overflow: hidden;
	}

	:global(svg.icon) {
		fill: #fff;
		opacity: 0.5;
		height: 0.7em;
		width: 1.2em;
		line-height: inherit;
		margin-right: 0.1em;
	}

	@media (min-width: 425px) {
		a:nth-child(2) {
			img {
				display: inline;
			}
		}

		a:nth-child(n + 3) {
			grid-column-start: span 2;
			img {
				display: none;
			}
		}
	}

	@media (min-width: 740px) {
		.media {
			max-height: 60%;
		}

		a:nth-child(n + 2) {
			grid-column-start: span 1;
		}

		a:nth-child(n + 3) {
			img {
				display: inline;
			}
		}
	}
</style>
