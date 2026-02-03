<script lang="ts">
	import type { Single } from '$lib/types/capi';

	export let articleImage: NonNullable<Single['articleImage']>;

	const pictureSupported =
		articleImage && articleImage.sources.length > 0 && 'srcset' in new Image();
</script>

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
		<img src={articleImage.backupSrc} alt={articleImage.altText} />
	</picture>
{:else if articleImage?.backupSrc}
	<img src={articleImage.backupSrc} alt={articleImage.altText} />
{/if}

<style lang="scss">
	picture,
	img {
		display: block;
		width: 100%;
	}

	/* Fix 5 : 4 aspect ratio */
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
</style>
