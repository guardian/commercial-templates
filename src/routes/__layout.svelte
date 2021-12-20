<script>
	import '../styles.css';
</script>

<nav>
	<a href="/">Home</a>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		background-color: darkblue;
		padding: 1rem;
		color: aliceblue;
	}

	nav a {
		color: inherit;
	}

	main {
		padding: calc(var(--grid-size) * 2);
	}
</style>
