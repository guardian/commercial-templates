<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Tone } from '$lib/types/tones';
	import '$templates/components/fonts/Egyptian.css';
	import '$templates/components/fonts/Headline.css';
	import '$templates/components/fonts/Sans.css';
	import ArrowRight from './icons/ArrowRight.svelte';

	export let image: string;
	export let url: string;
	export let linkText: string;
	export let tone: Tone;
	export let isProminent = false;
</script>

<a
	class="card"
	class:is-prominent={isProminent}
	href={clickMacro(url)}
	target="_top"
>
	<div class="media">
		<picture>
			<img src={image} alt="" />
		</picture>
	</div>

	<div class="text">
		<h2><slot name="title" /></h2>
		<p><slot name="text" /></p>
		{#if linkText}
			<span class="button" data-tone={tone ?? 'live'}>
				{linkText}
				<ArrowRight width={24} />
			</span>
		{/if}
	</div>
</a>

<style lang="scss">
	a {
		color: var(--neutral-0);
		text-decoration: none;
	}

	a.card {
		padding: 12px 10px;
		display: block;
		margin: 0px;
		flex: 1;
	}

	a.card:not(:first-of-type)::before {
		content: '';
		position: absolute;
		top: 91px;
		bottom: 12px;
		margin-left: -10px;
		width: 1px;
		background: var(--neutral-86);
	}

	.media {
		margin: 0 0 10px 0;
	}

	.text {
		padding: 0;
	}

	picture,
	img {
		display: block;
		width: auto;
		max-width: 100%;
		max-height: 150px;
	}

	h2 {
		font-size: 1rem;
		line-height: 1.25rem;
		font-family: 'GH Guardian Headline', 'Georgia', serif;
		font-weight: 500;
		padding: 0px;
		margin-bottom: 3px;
	}

	p {
		display: block;
		font-size: 0.75rem;
		line-height: 1rem;
		font-family:
			'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
		margin: 3px 0px;
	}

	.button {
		font-size: 12px;
		line-height: 0;
		font-weight: 700;
		font-family:
			'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
		background: var(--bg);
		color: var(--neutral-100);
		text-decoration: none;
		border-radius: 10rem;
		display: inline-flex;
		padding-left: 0.5rem;
		margin-top: 3px;
		align-self: flex-start;
		align-items: center;
	}

	@media (max-width: 739px) {
		a.card:nth-child(n + 3) {
			display: none;
		}
	}

	@media (min-width: 740px) {
		a.card {
			padding: 12px 10px;
			display: block;
			margin: 0px;
		}

		.button {
			margin-top: 6px;
			margin-bottom: 10px;
		}

		h2 {
			margin-bottom: 10px;
		}

		p {
			margin: 10px 0px;
		}

		.is-prominent.card:nth-child(1) {
			display: flex;
			flex-direction: row;
			align-items: stretch;

			.media {
				width: calc(66.67% - 10px);
				margin-right: 10px;

				picture,
				img {
					max-height: 100%;
				}
			}

			.text {
				flex: 1;
				padding: 6px 10px 6px 0;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}

			.button {
				margin-top: auto;
				margin-bottom: 4px;
			}
		}
	}

	@media (min-width: 1140px) {
		a.card:not(:first-of-type)::before {
			top: 12px;
		}
	}
</style>
