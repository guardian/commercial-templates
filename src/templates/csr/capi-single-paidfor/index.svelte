<script context="module" lang="ts">
	export const cdn = 'https://i.guim.co.uk/img/media/';
	export const api =
		'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json';
</script>

<script>
	import Card from '$templates/components/Card.svelte';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';

	export let Brand;
	export let SeriesUrl;
	export let ComponentTitle;

	export const promise = fetch(`${api}?k=${encodeURI(SeriesUrl)}`)
		.then((r) => r.json())
		.then((d) => (console.log(d), d));
</script>

<aside class="wrapper" style={`--brand:${Brand}`}>
	<PaidForHeader {ComponentTitle} {SeriesUrl} />
	{#await promise}
		Loading…
	{:then { articleHeadline, articleText, articleUrl }}
		<Card title={articleHeadline} text={articleText} url={articleUrl} />
	{:catch}
		<h3>⚠️ could not fetch series “{SeriesUrl}”</h3>
	{/await}
</aside>

<style>
	.wrapper {
		background-color: var(--brand);
	}
</style>
