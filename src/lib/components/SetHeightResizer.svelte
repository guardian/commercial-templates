<script lang="ts">
	import { browser } from '$app/environment';
	import { post } from '$lib/messenger';

	export let height: number;

	$: browser && post({ type: 'set-ad-height', value: { height, width: -1 } });
</script>
