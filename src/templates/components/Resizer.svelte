<script lang="ts">
	import { run } from 'svelte/legacy';

	import { post } from '$lib/messenger';

	interface Props {
		height: number;
	}

	let { height }: Props = $props();

	run(() => {
		post({ type: 'resize', value: { height } });
	});
</script>
