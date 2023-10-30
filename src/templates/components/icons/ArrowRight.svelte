<script lang="ts">
	export let width = 30;
	export let flip = false;
</script>

<svg aria-hidden="true" class:flip viewBox="0 0 30 30" {width} height={width} fill="currentColor"
	><path
		d="M22.8 14.6l-7.6-7.6-.7.7 5.5 6.6h-14v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"
	/></svg
>

<style>
	svg {
		vertical-align: middle;
	}

	.flip {
		transform: scaleX(-1);
	}
</style>
