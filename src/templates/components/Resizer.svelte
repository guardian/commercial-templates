<script lang="ts">
	import { post } from '$lib/messenger';

	interface Props {
		height: number;
	}

	let { height }: Props = $props();

	$effect(() => {
		post({ type: 'resize', value: { height } });
	});
</script>
