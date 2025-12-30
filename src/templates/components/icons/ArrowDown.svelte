<script lang="ts">
	interface Props {
		width?: number;
		flip?: boolean;
	}

	let { width = 24, flip = false }: Props = $props();

	let height = $derived((24 / 18) * width);
</script>

<svg viewBox="0 -4 24 18" {width} {height} class:flip
	><path
		d="M23.2.7L12.7 9.1l-1.1.9-1.1-.898L0 .7.5 0l11.1 6.3L22.7 0l.5.7z"
	/></svg
>

<style>
	svg {
		vertical-align: middle;
	}

	.flip {
		transform: scaleY(-1);
	}
</style>
