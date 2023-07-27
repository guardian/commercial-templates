<script lang="ts">
	import { getPageURL } from '$lib/messenger/get-page-url';
	import { type PgmApiOptions, create } from '$lib/public-good';
	import { getUSPData } from '$lib/cmp';
	import { post } from '$lib/messenger';

	let container: HTMLElement;

	const refresh = () =>
		post({
			type: 'refresh',
			value: 'public-good',
		});

	const onload = async () => {
		let url = await getPageURL();

		const consentState = await getUSPData();

		const isCcpaOptedOut = () => {
			return consentState.uspString[2] === 'Y';
		};

		if (isCcpaOptedOut()) {
			refresh();
			return;
		}

		const urlObj = new URL(url);

		const options: PgmApiOptions = {
			partnerId: 'gmg-guardian',
			attributes: {
				url,
			},
			onHide: () => {
				refresh();
			},
		};

		create(container, options);
	};
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://assets.publicgood.com/pgm/v1/pgm-api.js"
		on:load={onload}></script>
</svelte:head>
<div id="public-good" bind:this={container} />

<style lang="scss">
	#public-good {
		width: 100%;
		height: 450px;
	}
</style>
