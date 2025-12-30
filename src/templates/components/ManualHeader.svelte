<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Tone } from '$lib/types/tones';
	import ArrowRight from './icons/ArrowRight.svelte';
	import '$templates/components/fonts/Headline.css';
	import '$templates/components/fonts/SansBold.css';
	import '$templates/components/colours/tones.css';
	import ToneLogo from './ToneLogo.svelte';

	interface Props {
		buttonUrl: string;
		buttonText: string;
		tone: Tone;
		children?: import('svelte').Snippet;
	}

	let { buttonUrl, buttonText, tone, children }: Props = $props();
</script>

<header data-tone={tone}>
	<div class="logo">
		<ToneLogo tone={tone ?? 'live'} />
	</div>

	<div class="banner-description-container">
		<span class="banner-description">
			{@render children?.()}
		</span>
	</div>

	<div class="button-container">
		<a class="button" href={clickMacro(buttonUrl)} target="_top" rel="external">
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
		background: var(--header-btn-bg, var(--neutral-100));
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
