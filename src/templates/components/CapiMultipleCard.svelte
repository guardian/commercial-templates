<script lang="ts">
	import type { Single } from '$lib/types/capi';

	export let single: Single;
	export let direction = 'row';

	const { articleHeadline, articleUrl, articleImage } = single;
	const pictureSupported =
		articleImage.sources.length > 0 && 'srcset' in new Image();

</script>

<a class="card" href={articleUrl} style={`--direction: ${direction}`}>
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
		<h2>{@html articleHeadline}</h2>
	</div>
</a>

<style>
	a {
		color: #000000;
		text-decoration: none;
	}

	a.card {
		margin: 12px 10px;
		display: block;
		padding: 0px;
		width: 50%;
		background-color: #fff;
		border-top: 1px solid #69d1ca;
	}

	a.card:nth-child(n + 3) {
		display: none;
	}

	a.card:not(:first-of-type)::before {
		content: '';
		position: absolute;
		top: 119px;
		bottom: 102px;
		margin-left: -10px;
		width: 1px;
		background: #dcdcdc;
	}

	.media {
		background-color: gray;
		margin: 0 0 10px 0;
	}

	.text {
		padding: 0 5px;
	}

	picture,
	img {
		display: block;
		width: 100%;
	}

	h2 {
		font-size: 1rem;
		line-height: 1.25rem;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-weight: 500;
		padding: 0px;
		margin-bottom: 3px;
		color: #333
	}

	:global(.kicker) {
		color: #626262;
	}

	@media (min-width: 740px) {

		a.card:nth-child(n) {
			display: block;
		}

		h2 {
			margin-bottom: 10px;
		}
	}

	@media (min-width: 1140px) {
		a.card:not(:first-of-type)::before {
			top: 12px;
		}
	}
</style>
