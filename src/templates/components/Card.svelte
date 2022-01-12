<script lang="ts">
	import type { Single } from '$lib/types/capi';

	export let single: Single;

	const { articleHeadline, articleUrl, articleText, articleImage } = single;
	const pictureSupported =
		articleImage.sources.length > 0 && 'srcset' in new Image();
</script>

<a href={articleUrl}>
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
		{:else}
			<img src={articleImage.backupSrc} alt="" />
		{/if}
	</div>
	<h2>{articleHeadline}</h2>
	<!-- <p>{articleText}</p> -->
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
		display: flex;
	}

	.media {
		width: 50%;
		max-width: 600px;
		flex-shrink: 0;
	}

	picture,
	img {
		display: block;
		width: 100%;
	}

	h2 {
		padding: 5px;
	}

	p {
		padding: 20px;
	}
</style>
