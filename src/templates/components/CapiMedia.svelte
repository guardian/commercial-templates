<script lang="ts">
	import type { Single } from '$lib/types/capi';

	export let articleImage: NonNullable<Single['articleImage']>;

	const pictureSupported =
		articleImage.sources.length > 0 && 'srcset' in new Image();
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
		<img src={articleImage.backupSrc} alt="" />
	</picture>
{:else if articleImage?.backupSrc}
	<img src={articleImage.backupSrc} alt="" />
{/if}
