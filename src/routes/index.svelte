<script lang="ts">
	export const templates = ['test'] as const;
</script>

<h1>Commercial Templates</h1>

<ol>
	{#each templates as template}
		<li>
			{template.slice(0, 1).toUpperCase() + template.slice(1)}
			<a href={`/csr/${template}`}>CSR</a> -
			<a href={`/ssr/${template}`}>SSR</a>
		</li>
	{/each}
</ol>
