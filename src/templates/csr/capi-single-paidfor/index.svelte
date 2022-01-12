<script context="module" lang="ts">
	export const cdn = 'https://i.guim.co.uk/img/media/';
	export const api =
		'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json';
</script>

<script lang="ts">
	import type { Single } from '$lib/types/capi';
	import type { Prop } from '$lib/svelte';

	import Card from '$templates/components/Card.svelte';
	import PaidForHeader from '$templates/components/PaidForHeader.svelte';

	export let SeriesUrl: Prop;
	export let ComponentTitle: Prop;

	export const promise: Promise<Single> = fetch(
		`${api}?k=${encodeURI(SeriesUrl)}`,
	)
		.then((r) => r.json())
		.then((d) => (console.log(d), d));
</script>

<aside>
	<PaidForHeader {ComponentTitle} {SeriesUrl} />
	{#await promise}
		Loading…
	{:then { articleHeadline, articleText, articleUrl, articleImage }}
		<Card
			title={articleHeadline}
			text={articleText}
			url={articleUrl}
			image={articleImage}
		/>
	{:catch}
		<h3>⚠️ could not fetch series “{SeriesUrl}”</h3>
	{/await}
</aside>

<style>
	aside {
		background: #f6f6f6;
		display: flex;
		flex-direction: column;

		font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica,
			Arial, 'Lucida Grande', sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
		-webkit-font-smoothing: antialiased;
	}

	@media (min-width: 1140px) {
		aside {
			flex-direction: row;
		}
	}
</style>
