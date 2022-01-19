<script lang="ts">
	export let sizes: number[];
</script>

<ol>
	{#each sizes as size}
		<li>{size}</li>
	{/each}
</ol>

<style>
	ol {
		font-family: sans-serif;
		color: mediumorchid;
	}
</style>
