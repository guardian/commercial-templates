<script lang="ts">
	export let sizes;
</script>

<ol>
	{#each sizes as size}
		<li>{size}</li>
	{/each}
</ol>
