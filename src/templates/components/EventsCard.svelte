<script context="module" lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
</script>

<script lang="ts">
	import '$templates/components/fonts/Egyptian.css';
	import '$templates/components/fonts/EgyptianWeb.css';
	import '$templates/components/fonts/Sans.css';
	import Button from './Button.svelte';
	import ArrowRight from './icons/ArrowRight.svelte';

	export let EventTitle: GAMVariable;
	export let EventDateTime: GAMVariable;
	export let EventImage: GAMVariable;
	export let EventUrl: GAMVariable;
	export let direction = 'row';

	let [boldTitle, regularTitle] = EventTitle.split(':');
	if (regularTitle) {
		boldTitle += ':';
	} else {
		regularTitle = '';
	}
</script>

<a class="card" href={EventUrl} style={`--direction: ${direction}`}>
	<div class="media">
		<picture>
			<img src={EventImage} alt="" />
		</picture>
	</div>
	<div class="text">
		<h2><b>{boldTitle}</b>{regularTitle}</h2>
		<p>{EventDateTime}</p>
	</div>
	<a
		class="button"
		href={`${CLICK_MACRO}${EventUrl}`}
		target="_top"
	>
		Book tickets
		<ArrowRight width={24} />
	</a>
</a>

<style>
	a.card {
		text-decoration: none;
		color: inherit;
		display: grid;
		gap: 20px;
		padding: 10px;
		font-family: 'GuardianTextEgyptian', 'Georgia', serif;
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

	a.button {
		display: none;
	}

	@media (min-width: 740px) {
		a.card {
			padding: 12px 10px;
			display: block;
			margin: 0px;
			width: 25%;
		}

		a.card:not(:first-of-type)::before {
			content: "";
			position: absolute;
			top: 91px;
			bottom: 12px;
			margin-left: -10px;
			width: 1px;
			background: #dcdcdc;
		}

		.media {
			background-colour: gray;
			margin: 0 0 10px 0;
		}

		h2 {
			font-size: 1rem;
			line-height: 1.25rem;
			font-family: 'Guardian Egyptian Web', 'Georgia', serif;
			font-weight: normal;
			padding: 0px;
		}

		p {
			display: block;
			font-size: 0.75rem;
			line-height: 1rem;
			font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
		}

		a.button {
			margin-top: 6px;
			margin-bottom: 10px;
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
			align-self: flex-start;
			-webkit-box-align: center;
			align-items: center;
		}
	}

	@media (min-width: 1140px) {
		a.card:not(:first-of-type)::before {
			top: 12px;
		}
	}
</style>
