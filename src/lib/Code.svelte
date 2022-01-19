<script lang="ts">
	export let html: string;
	export let css: string;
</script>

<section id="code">
	<h3>CODE</h3>

	<div class="html">
		<h2>HTML</h2>
		<pre>{html}</pre>
	</div>
	<div>
		<h2>CSS</h2>
		<pre>{css}</pre>
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
</style>
