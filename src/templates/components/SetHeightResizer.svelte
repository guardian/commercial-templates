<script lang="ts">
	import { run } from 'svelte/legacy';

	import { post } from '$lib/messenger';

	interface Props {
		height: number;
	}

	let { height }: Props = $props();

	run(() => {
		post({ type: 'set-ad-height', value: { height, width: -1 } });
	});
</script>
