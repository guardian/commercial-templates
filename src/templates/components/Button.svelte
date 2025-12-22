<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<button onclick={bubble('click')} aria-controls="popup" aria-expanded="true"
	>{@render children?.()}</button
>

<style>
	button {
		display: inline-block;
		background: none;
		border: 0;
		color: inherit;
		font: inherit;
		padding: 0;
		margin: 0;

		cursor: help;
	}
</style>
