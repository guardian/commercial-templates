<script lang="ts">
	export let width = 30;
	const height = width;

	export let plus = false;
</script>

<svg {width} {height} class:plus
	><path
		d="M21 9.8l-.8-.8-5.2 4.8-5.2-4.8-.8.8 4.8 5.2-4.8 5.2.8.8 5.2-4.8 5.2 4.8.8-.8-4.8-5.2 4.8-5.2"
	/></svg
>

<style>
	svg {
		vertical-align: middle;
		overflow: hidden;
		transition: transform 1s;
	}

	.plus {
		transform: rotate(45deg);
	}
</style>
