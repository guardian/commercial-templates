<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import ArrowRight from './icons/ArrowRight.svelte';
	import LiveLogo from './icons/LiveLogo.svelte';
	import '$lib/components/fonts/Headline.css';
	import '$lib/components/fonts/SansBold.css';

	export let HeaderButtonUrl: string;
	export let BannerDescription: string;
	export let HeaderButtonText: string;
</script>

<header>
	<div class="logo">
		<LiveLogo />
	</div>

	<div class="banner-description-container">
		<span class="banner-description">{BannerDescription}</span>
	</div>

	<div class="button-container">
		<a class="button" href={clickMacro(HeaderButtonUrl)} target="_top">
			{HeaderButtonText}
			<ArrowRight width={30} />
		</a>
	</div>
</header>

<style lang="scss">
	header {
		background-color: #c83877;
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
		color: var(--neutral-0);
		background: var(--neutral-100);
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
		font-family:
			'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
		background: var(--neutral-100);
		color: var(--neutral-0);
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
