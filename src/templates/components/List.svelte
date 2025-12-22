<script lang="ts">
	interface Props {
		sizes: number[];
	}

	let { sizes }: Props = $props();
</script>

<ol>
	{#each sizes as size}
		<li>{size}</li>
	{/each}
</ol>

<style>
	ol {
		font-family: sans-serif;
		color: blanchedalmond;
		margin: 0;
	}
</style>
