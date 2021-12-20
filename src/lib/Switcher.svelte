<script lang="ts">
	export let mode: 'csr' | 'ssr';
	export let template: string;
</script>

<h2>
	{#if mode === 'ssr'}
		<strong>SSR</strong> – <a href={`/csr/${template}`}>CSR</a>
	{:else}
		<a href={`/ssr/${template}`}>SSR</a> – <strong>CSR</strong>
	{/if}
</h2>

<style>
	h2 {
		font-weight: 400;
	}
</style>
