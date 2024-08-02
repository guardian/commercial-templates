<script lang="ts">
	import { post } from '$lib/messenger';

	export let height: number;

	$: post({ type: 'resize', value: { height } });
</script>
