<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import AudioIcon from './icons/AudioIcon.svelte';
	import CameraIcon from './icons/CameraIcon.svelte';
	import VideoIcon from './icons/VideoIcon.svelte';
	import Sponsor from './Sponsor.svelte';

	export let templateType: 'single' | 'multiple';
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



	
	const pictureSupported =
		articleImage && articleImage.sources.length > 0 && 'srcset' in new Image();
</script>

<a class="{templateType}-card" href={clickMacro(articleUrl)} target="_top">
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
		{#if templateType === 'single'}
			<p>{articleText}</p>
		{/if}
	</div>
	{#if templateType === 'single'}
		<Sponsor branding={single.branding} {templateType} />
	{/if}
</a>

<style lang="scss">
	a {
		color: var(--neutral-0);
		text-decoration: none;
	}

	a.single-card {
		display: grid;
		gap: 20px;
		padding: 10px;
	}

	a.multiple-card {
		margin: 12px 10px 0px 10px;
		display: block;
		padding: 0 0 8px 0;
		width: auto;
		background-color: var(--neutral-97);
		border-top: 1px solid var(--labs-400);
	}

	a.multiple-card:hover {
		background-color: #e4e4e4;
	}

	a.single-card .media {
		margin: -10px;
	}

	a.multiple-card .media {
		background-color: gray;
		margin: 0;
	}

	picture,
	img {
		display: block;
		width: 100%;
		min-height: 80px;
	}

	a.single-card .text {
		padding: 0;

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
	}

	a.multiple-card .text {
		padding: 0 5px;

		h2 {
			font-size: 1rem;
			line-height: 1.25rem;
			font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
				'Lucida Grande', sans-serif;
			font-weight: 500;
			padding: 0px;
			margin: 6px 0 8px 0;
			color: var(--neutral-20);
		}
	}

	.kicker {
		color: #626262;
	}

	:global(svg.icon) {
		fill: #767676;
		height: 0.7em;
		width: 1.2em;
		line-height: inherit;
		margin-right: 0.1em;
	}

	@media (max-width: 739px) {
		a.multiple-card:not(:first-of-type) .media {
			display: none;
		}
	}

	@media (min-width: 740px) {
		a.single-card {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: repeat(2, auto);
		}

		a.single-card .media {
			grid-row: span 2;
		}

		a.multiple-card {
			margin: 12px 10px;
		}

		a.multiple-card:not(:first-of-type)::before {
			content: '';
			position: absolute;
			top: 78px;
			bottom: 102px;
			margin-left: -10px;
			width: 1px;
			background: var(--neutral-86);
		}

		a.multiple-card:nth-child(n) {
			display: block;
		}

		a.multiple-card .text h2 {
			margin-bottom: 10px;
		}
	}

	@media (min-width: 980px) {
		a.multiple-card:not(:first-of-type)::before {
			top: 131px;
		}
	}

	@media (min-width: 1140px) {
		a.single-card .text p {
			display: block;
		}

		a.multiple-card:not(:first-of-type)::before {
			top: 12px;
		}
	}
</style>
