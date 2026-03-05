<script lang="ts">
	import { post } from '$lib/messenger';

	export let height: number;

	$: post({ type: 'set-ad-height', value: { height, width: -1 } });
</script>
