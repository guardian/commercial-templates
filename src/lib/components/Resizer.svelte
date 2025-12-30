<script lang="ts">
	import { browser } from '$app/environment';
	import { post } from '$lib/messenger';

	export let height: number;

	$: browser && post({ type: 'resize', value: { height } });
</script>
