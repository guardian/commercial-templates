<script lang="ts">
	import { asset, resolve } from '$app/paths';
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.png')} />
	<link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
</svelte:head>

<div class="container">
	<nav>
		<a href={resolve('/')}>All templates</a>

		<a href="https://github.com/guardian/commercial-templates">Edit on Github</a
		>
	</nav>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@use '$styles/global';
	@use '$styles/fonts/Sans';
	@use '$styles/fonts/SansBold';
	@use '$styles/fonts/SansItalic';
	@use '$styles/fonts/SansBoldItalic';

	nav {
		background-color: darkblue;
		padding: 1rem;
		color: aliceblue;

		display: flex;
		gap: 1rem;
	}

	nav a {
		color: inherit;
	}

	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		background-image:
			repeating-linear-gradient(
				to right,
				transparent 0 calc(var(--grid-size) - 1px),
				var(--grid-color) calc(var(--grid-size) - 1px) var(--grid-size)
			),
			repeating-linear-gradient(
				to bottom,
				transparent 0 calc(var(--grid-size) - 1px),
				var(--grid-color) calc(var(--grid-size) - 1px) var(--grid-size)
			);
		background-repeat: repeat;
		background-size: var(--grid-size);
	}

	main {
		padding: calc(var(--grid-size) * 2);
	}
</style>
