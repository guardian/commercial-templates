<script lang="ts">
	import { base } from '$app/paths';

	import '../styles.css';
	import '../templates/components/fonts/Sans.css';
	import '../templates/components/fonts/SansBold.css';
	import '../templates/components/fonts/SansItalic.css';
	import '../templates/components/fonts/SansBoldItalic.css';
</script>

<svelte:head>
	<link rel="icon" href={`${base}/favicon.png`} />
	<link rel="icon" href={`${base}/favicon.svg`} />
</svelte:head>

<nav>
	<a href={`${base}/`}>All templates</a>

	<a href="https://github.com/guardian/commercial-templates">Edit on Github</a
	>
</nav>

<main>
	<slot />
</main>

<style>
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
