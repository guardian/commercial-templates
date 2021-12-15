<script context="module">
	export const cdn = "https://i.guim.co.uk/img/media/";
	export const path = "a5103656f1a074a716b8821afca8ee7c23361866/0_153_5347_3210/master/5347.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e156e68276b22fcf872a20a766cb326f";
	import List from '$lib/List.svelte'
</script>

<script lang="ts">
	export let info: string;
</script>

<h2>My props</h2>
<pre>info: {info}</pre>

<img src={cdn+path} alt="an advertisment" />

<List />

<style>
	img {
		display: block;
		padding: 1rem;
		background-color: aquamarine;
	}
</style>
