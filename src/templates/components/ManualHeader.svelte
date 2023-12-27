<script context="module" lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
</script>

<script lang="ts">
	import ArrowRight from './icons/ArrowRight.svelte';
	import '$templates/components/fonts/Headline.css';
	import '$templates/components/fonts/SansBold.css';
	import '$templates/components/colours/tones.css';

	export let buttonUrl: string;
	export let buttonText: string;
	export let tone: Tone;
</script>

<header data-tone={tone}>
	<div class="logo">
		<slot name="logo" class="logo" />
	</div>

	<div class="banner-description-container">
		<span class="banner-description">
			<slot name="description" />
		</span>
	</div>

	<div class="button-container">
		<a class="button" href={`${CLICK_MACRO}${buttonUrl}`} target="_top">
			{buttonText}
			<ArrowRight width={30} />
		</a>
	</div>
</header>

<style lang="scss">
	header {
		background-color: var(--bg);
		color: black;
		padding: 6px 20px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		align-self: flex-start;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.banner-description {
		font-size: 16px;
		line-height: 22px;
		font-family: 'GH Guardian Headline', 'Georgia', serif;
		font-weight: 500;
		color: #000000;
		background: #ffffff;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
		padding: 2px 5px 2px 2px;

		@media (max-width: 1140px) {
			display: none;
		}
	}

	div.banner-description-container {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.button-container {
		display: flex;
		flex-direction: row;
	}

	a.button {
		font-size: 13px;
		font-weight: 700;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		background: var(--header-btn-bg, #ffffff);
		color: #000000;
		text-decoration: none;
		border-radius: 10rem;
		padding: 3px;
		padding-left: 1rem;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
	}

	@media (min-width: 1140px) {
		header {
			padding: 12px 20px;
			width: 171px;
			flex-direction: column;
		}

		.button-container {
			flex-direction: column;
			width: 100%;
		}
	}

	@media (min-width: 1300px) {
		header {
			width: 251px;
		}
	}
</style>
