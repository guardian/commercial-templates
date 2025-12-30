<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		onclick?: (ev: MouseEvent) => void;
	}

	let { children, onclick }: Props = $props();
</script>

<button {onclick} aria-controls="popup" aria-expanded="true"
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
