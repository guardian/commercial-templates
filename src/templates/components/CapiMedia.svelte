<script lang="ts">
	import type { Single } from '$lib/types/capi';

	export let articleImage: NonNullable<Single['articleImage']>;
</script>

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
