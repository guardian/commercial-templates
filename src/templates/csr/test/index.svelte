<script context="module" lang="ts">
	import List from '$templates/components/List.svelte';

	export const cdn = 'https://i.guim.co.uk/img/media/';
	export const path =
		'a5103656f1a074a716b8821afca8ee7c23361866/0_153_5347_3210/master/5347.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e156e68276b22fcf872a20a766cb326f';
</script>

<script>
	export let Info;
	export let Brand;
</script>

<div class="wrapper" style={`--brand:${Brand}`}>
	<img src={cdn + path} alt="an advertisment" />

	<h2>My props</h2>
	<pre>info: {Info}</pre>
	<pre>brand: {Brand}</pre>

	<h2>A List</h2>
	<List sizes={[300, 600, 900, 1200]} />
</div>

<style>
	.wrapper {
		background-color: var(--brand);
	}

	img {
		display: block;
		padding: 1rem;
		float: right;
		max-width: 50%;
		max-height: 100%;

		background-color: orangered;
	}
</style>
