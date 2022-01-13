<script lang="ts">
	import type { Single } from '$lib/types/capi';
	import Sponsor from './Sponsor.svelte';

	export let single: Single;
	export let direction = 'row';

	const { articleHeadline, articleUrl, articleText, articleImage } = single;
	const pictureSupported =
		articleImage.sources.length > 0 && 'srcset' in new Image();
</script>

<a href={articleUrl} style={`--direction: ${direction}`}>
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
	<div class="text">
		<h2>{articleHeadline}</h2>
		<p>{articleText}</p>
	</div>
	<Sponsor branding={single.branding} />
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
		display: grid;
		gap: 20px;
		padding: 10px;
	}

	.media {
		margin: -10px;
	}

	.text {
		padding: 0;
	}

	picture,
	img {
		display: block;
		width: 100%;
	}

	h2 {
		margin: 0;
		padding: 0 0 10px;
		font-size: 1.25rem;
	}

	p {
		display: none;
		margin: 0;
		padding: 0;
	}

	@media (min-width: 740px) {
		a {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: repeat(2, auto);
		}

		.media {
			grid-row: span 2;
		}
	}

	@media (min-width: 1140px) {
		.text p {
			display: block;
		}
	}
</style>
