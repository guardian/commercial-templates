<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import CapiMedia from './CapiMedia.svelte';
	import AudioIcon from './icons/AudioIcon.svelte';
	import CameraIcon from './icons/CameraIcon.svelte';
	import VideoIcon from './icons/VideoIcon.svelte';
	import SponsorRedesign from './SponsorRedesign.svelte';

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
			<CapiMedia {articleImage} />
		{/if}
	</div>

	<div class="sponsor">
		<SponsorRedesign branding={single.branding} templateType="single" />
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

	.single-card {
		color: var(--neutral-0);
		text-decoration: none;
		border-top: 1px solid var(--neutral-73);
		margin: 8px;
		display: grid;
		gap: 20px;
		padding: 8px;
	}

	.single-card .media {
		margin-left: -10px;
		margin-right: -10px;
	}

	picture,
	img {
		display: block;
		width: 100%;
	}

	.single-card .text {
		padding: 0;

		h2 {
			margin: 0;
			padding: 0 0 10px;
			font-size: 24px;
			font-family: 'GuardianTextSans';
			color: var(--neutral-7);
		}

		p {
			display: none;
			margin: 0;
			padding: 0;
			color: var(--neutral-38);
		}
	}

	.kicker {
		font-size: 16px;
		color: var(--labs-200);
	}

	@media (min-width: 740px) {
		.single-card {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr), 100px;
		}

		.single-card .media,
		.single-card .text {
			grid-row: span 2;
		}

		.single-card img {
			border-radius: 0;
		}

		.single-card .sponsor {
			grid-column-start: 2;
		}
	}

	@media (min-width: 1140px) {
		.single-card {
			margin: 8px 20px 8px;
		}
		.single-card .text p {
			display: block;
		}
	}
</style>
