<script lang="ts">
	import { post } from '$lib/messenger';

	interface Props {
		height: number;
	}

	let { height }: Props = $props();

	$effect(() => {
		post({ type: 'set-ad-height', value: { height, width: -1 } });
	});
</script>
