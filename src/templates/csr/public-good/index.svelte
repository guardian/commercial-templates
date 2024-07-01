<script lang="ts">
	import { getUSPData, isCcpaOptedOut } from '$lib/cmp';
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

		const consentState = await getUSPData();

		if (!consentState || isCcpaOptedOut(consentState)) {
			!consentState && console.error('No consent state found');

			return refresh();
		}

		if (!url) {
			console.error('No URL found');
			return refresh();
		}
		const options: PgmApiOptions = {
			partnerId: 'gmg-guardian',
			attributes: {
				url: url as string,
			},
			onHide: refresh,
		};

		create(container, options);
	};
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://assets.publicgood.com/pgm/v1/pgm-api.js"
		on:load={onload}
	></script>
</svelte:head>
<div id="public-good" bind:this={container} />

<style lang="scss">
	#public-good {
		width: 100%;
		height: 450px;
	}
</style>
