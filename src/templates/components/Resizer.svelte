<script lang="ts">
	import { post } from '$lib/messenger';

	export let height: number;

	$: post({ type: 'resize', value: height });
</script>

<div>{height}px</div>

<style>
	div {
		position: absolute;
		top: 20px;
		left: 0;
	}
</style>
