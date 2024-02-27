<script lang="ts">
	export let html: string;
	export let css: string;
	export let showHTML = false;
	export let showCSS = false;
</script>

<section id="code">
	<h3>CODE</h3>

	<div class="html">
		<h2>HTML</h2>
		<button on:click={() => (showHTML = !showHTML)}>
			{#if showHTML}
				Hide HTML
			{:else}
				Show HTML
			{/if}
		</button>
		{#if showHTML}
			<pre>{html}</pre>
		{/if}
	</div>
	<div>
		<h2>CSS</h2>
		<button on:click={() => (showCSS = !showCSS)}>
			{#if showCSS}
				Hide CSS
			{:else}
				Show CSS
			{/if}
		</button>
		{#if showCSS}
			<pre>{css}</pre>
		{/if}
	</div>
</section>

<style>
	#code {
		display: grid;
		grid-template-columns: repeat(2, 40%);
		gap: calc(var(--grid-size) * 3);
	}

	pre {
		white-space: pre-wrap;
		word-break: break-all;
	}

	h3 {
		grid-column: span 2;
	}

	button {
		color: white;
		border: 2px solid darkblue;
		background-color: darkblue;
		border-radius: 15px;
		font-size: 1rem;
		font-family: inherit;
		padding: 5px 10px;
	}
</style>
