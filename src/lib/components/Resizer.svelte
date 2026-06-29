<script lang="ts">
	import { run } from 'svelte/legacy';

	import { browser } from '$app/environment';
	import { post } from '$lib/messenger';

	interface Props {
		height: number;
	}

	let { height }: Props = $props();

	run(() => {
		browser && post({ type: 'resize', value: { height } });
	});
</script>
