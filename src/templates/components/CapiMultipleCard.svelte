<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import AudioIcon from './icons/AudioIcon.svelte';
	import CameraIcon from './icons/CameraIcon.svelte';
	import VideoIcon from './icons/VideoIcon.svelte';

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

	const pictureSupported =
		articleImage && articleImage.sources.length > 0 && 'srcset' in new Image();
</script>

<a class="multiple-card" href={clickMacro(articleUrl)} target="_top">
	<div class="text">
		<h2>
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
		</h2>
	</div>
	<div class="media">
		{#if pictureSupported}
			<picture>
				{#each articleImage.sources.filter((source) => source.minWidth === '0') as source}
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
				<img src={articleImage.backupSrc} alt="" />
			</picture>
		{:else if articleImage?.backupSrc}
			<img src={articleImage.backupSrc} alt="" />
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

	.multiple-card {
		color: var(--neutral-0);
		text-decoration: none;
		flex-basis: 100%;
		margin: 12px 10px 0px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 0 8px 0;
		width: auto;
		overflow: hidden;
	}

	picture,
	img {
		display: block;
		width: 100%;
	}

	.multiple-card .text {
		padding: 0 5px;

		h2 {
			font-size: 17px;
			font-weight: 700;
			line-height: 1.25rem;
			font-family: 'GuardianTextSans';
			color: var(--neutral-7);
			padding: 0px;
			margin: 6px 0 8px 0;
		}
	}

	.kicker {
		font-size: 16px;
		color: var(--labs-200);
	}

	@media (max-width: 739px) {
		.multiple-card:not(:first-of-type) {
			padding-top: 8px;
			flex-direction: row-reverse;

			picture {
				position: relative;
				height: 95px;
				width: 120px;
				overflow: hidden;
				& > * {
					position: absolute;
					height: 100%;
					width: auto;
					transform: translateX(-25%);
				}
			}
		}
	}

	@media (min-width: 740px) {
		.multiple-card {
			margin: 12px 10px;
		}

		.multiple-card:not(:first-of-type)::before {
			content: '';
			/** Absolutely positioned relative to the cards-container div */
			position: absolute;
			/** Top and bottom offset due to margin */
			top: 12px;
			bottom: 12px;
			margin-left: -10px;
			width: 1px;
			background: var(--neutral-73);
		}

		.multiple-card .text h2 {
			margin-bottom: 10px;
		}

		.multiple-card .media {
			background-color: gray;
			margin: 0;
			width: 100%;

			// Fix 5 : 4 aspect ratio
			picture {
				padding-top: calc(4 / 5 * 100%);
				position: relative;
				& > * {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					height: 100%;
					width: auto;
				}
			}
		}
	}
</style>
