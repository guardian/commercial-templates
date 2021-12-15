<script>
	import '../styles.css';
</script>

<nav>
	<a href="/">Home</a>
</nav>

<slot />

<style>
	nav {
		background-color: darkblue;
		padding: 1rem;
		color: aliceblue;
	}

	nav a {
		color: inherit
	}
</style>
