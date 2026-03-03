<script lang="ts">
	import { asset, resolve } from '$app/paths';
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.png')} />
	<link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
</svelte:head>

<nav>
	<a href={resolve('/')}>All templates</a>

	<a href="https://github.com/guardian/commercial-templates">Edit on Github</a>
</nav>

<main>
	<slot />
</main>

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

	main {
		padding: calc(var(--grid-size) * 2);
	}
</style>
