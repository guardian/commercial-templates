<script lang="ts">
	export let sizes;
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
