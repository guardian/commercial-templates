<script context="module" lang="ts">
	import List from '$templates/components/List.svelte';

	export const cdn = 'https://i.guim.co.uk/img/media/';
	export const path =
		'a5103656f1a074a716b8821afca8ee7c23361866/0_153_5347_3210/master/5347.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e156e68276b22fcf872a20a766cb326f';
</script>

<script lang="ts">
	import type { Prop } from '$lib/svelte';

	export let Info: Prop;
	export let Brand: Prop;
</script>

<div style={`--brand:${Brand}`}>
	<h2>My props</h2>
	<pre>info: {Info}</pre>
	<pre>brand: {Brand}</pre>

	<img width="600" height="400" src={cdn + path} alt="an advertisment" />

	<List sizes={[300, 600, 900, 1200]} />
</div>


<style>
	div {
		background-color: var(--brand);
	}

	h2 {
		margin: 0;
		padding: 1em 0;
	}
	img {
		display: block;
		padding: 1rem;
		object-fit: cover;

		background-color: orangered;
	}
</style>
