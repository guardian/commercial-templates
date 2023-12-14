<script context="module" lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
</script>

<script lang="ts">
	import '$templates/components/fonts/Egyptian.css';
	import '$templates/components/fonts/Headline.css';
	import '$templates/components/fonts/Sans.css';
	import ArrowRight from './icons/ArrowRight.svelte';

	export let image: string;
	export let url: string;
	export let callToAction: string;
	export let direction = 'row';
</script>

<a class="card" href={url} style={`--direction: ${direction}`}>
	<div class="media">
		<picture>
			<img src={image} alt="" />
		</picture>
	</div>

	<div class="text">
		<h2><slot name="title" /></h2>
		<p><slot name="text" /></p>
	</div>
	<a class="button" href={`${CLICK_MACRO}${url}`} target="_top">
		{callToAction}
		<ArrowRight width={24} />
	</a>
</a>

<style>
	a {
		color: #000000;
		text-decoration: none;
	}

	a.card {
		padding: 12px 10px;
		display: block;
		margin: 0px;
		max-width: 25%;
		flex: 1;
	}

	a.card:nth-child(n + 3) {
		display: none;
	}

	a.card:not(:first-of-type)::before {
		content: '';
		position: absolute;
		top: 91px;
		bottom: 12px;
		margin-left: -10px;
		width: 1px;
		background: #dcdcdc;
	}

	.media {
		background-color: gray;
		margin: 0 0 10px 0;
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
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		margin: 3px 0px;
	}

	a.button {
		font-size: 12px;
		line-height: 0;
		font-weight: 700;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		background: #c83877;
		color: #ffffff;
		text-decoration: none;
		border-radius: 10rem;
		display: inline-flex;
		padding-left: 0.5rem;
		margin-top: 3px;
		align-self: flex-start;
		align-items: center;
	}

	@media (min-width: 740px) {
		a.card:nth-child(n) {
			padding: 12px 10px;
			display: block;
			margin: 0px;
		}

		a.button {
			margin-top: 6px;
			margin-bottom: 10px;
		}

		h2 {
			margin-bottom: 10px;
		}

		p {
			margin: 10px 0px;
		}
	}

	@media (min-width: 1140px) {
		a.card:not(:first-of-type)::before {
			top: 12px;
		}
	}
</style>
