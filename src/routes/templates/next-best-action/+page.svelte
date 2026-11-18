<script lang="ts">
	import { post } from '$lib/messenger';
	import { onMount } from 'svelte';

	const renderSdcMessage = () => {
		post({
			type: 'sdc-render',
			value: {
				clickMacro: '%%CLICK_URL_UNESC%%',
				pb: '%%PATTERN:nba_pb%%',
				id: '%%PATTERN:nba_id%%',
			},
		});
	};

	onMount(() => {
		renderSdcMessage();
		console.log('NBA creative rendering');
	});
</script>
