<script lang="ts">
	import { post } from '$lib/messenger';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

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

	const resetHeight = () => {
		post({
			type: 'reset-height',
			value: true,
		});
	};

	onMount(() => {
		renderSdcMessage();
		console.log('NBA creative rendering');

		if (data.ResetHeight) {
			resetHeight();
			console.log('NBA creative resetting min height on slot');
		}
	});
</script>
