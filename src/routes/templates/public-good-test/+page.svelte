<script lang="ts">
	import { getGPPData, isGppOptedOut } from '$lib/cmp';
	import { post } from '$lib/messenger';
	import { getPageURL } from '$lib/messenger/get-page-url';
	import { create, type PgmApiOptions } from '$lib/public-good';

	let container: HTMLElement;

	const refresh = () =>
		post({
			type: 'passback-refresh',
			value: 'public-good',
		});

	const onload = async () => {
		let url = await getPageURL();

		const consentState = await getGPPData();

		if (!consentState) {
			console.error('No consent state found');
			return refresh();
		}

		if (isGppOptedOut(consentState)) {
			console.error('GPP opted out');
			return refresh();
		}

		if (!url) {
			console.error('No URL found');
			return refresh();
		}
		const options: PgmApiOptions = {
			partnerId: 'gmg-guardian',
			attributes: {
				url,
			},
			onHide: refresh,
		};

		create(container, options);
	};
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://assets.publicgood.com/pgm/v1/dpg.js"
		on:load={onload}
	></script>
</svelte:head>
<div
	id="public-good"
	class="pgs-dpg-flex"
	data-pgs-partner-id="gmg"
	data-pgs-target-id="db973434-8db2-4293-9485-45ba5b591416"
	data-pgs-target-type="campaign"
	bind:this={container}
></div>

<style lang="scss">
	#public-good {
		width: 100%;
		height: 465px;
	}
</style>
