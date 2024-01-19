<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import '$templates/components/fonts/SansBold.css';
	import '$templates/components/fonts/EgyptianBold.css';
	import type { Tone } from '$lib/types/tones';
	import ToneLogo from './ToneLogo.svelte';
	import ArrowRight from './icons/ArrowRight.svelte';

	export let baseUrl: string;
	export let offerUrl: string;
	export let tone: Tone;
	export let image: string;
	export let title: string;
	export let linkText: string;
</script>

<header>
	<a
		href={clickMacro(baseUrl)}
		class="logo"
		data-link-name="title"
		target="_top"
	>
		<ToneLogo {tone} />
	</a>
</header>
<a
	href={clickMacro(offerUrl)}
	data-link-name="Offer 1 | {title}"
	class="card"
	target="_top"
>
	<img src={image} alt={title} />
	<div class="text">
		<h2><slot name="title" /></h2>
		<p class="description"><slot name="text" /></p>
		<div class="button">
			{linkText}
			<ArrowRight width={24} />
		</div>
	</div>
</a>

<style lang="scss">
	header {
		background-color: var(--bg);
		display: flex;

		a {
			padding: 6px 5px;
		}
	}

	.card {
		text-decoration: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;

		&:hover .button {
			background: #01161e;
		}
	}

	img {
		max-width: 100%;
	}

	.text {
		display: flex;
		flex-direction: column;
		margin: 6px 5px;
		color: #121212;
		font-size: 0.75rem;
		line-height: 1.33;
	}

	h2 {
		margin: 0;
		font-family: 'Guardian Text Egyptian', 'GuardianTextEgyptian', Georgia,
			serif;
		font-size: 1rem;
		line-height: 1.25;
	}

	// p tags are currently inserted into some GAM Creatives, e.g. Offer Text in Creative with ID: 138461351383.
	// global is required since these added p tags are not specified in the HTML above.
	:global(p) {
		color: #121212;
		margin: 0 0 0.5em;
	}

	.button {
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-weight: 700;
		color: #fff;
		width: fit-content;
		background: #012937;
		border-radius: 100px;
		padding-left: 8px;
		display: flex;
		align-items: center;
	}
</style>
