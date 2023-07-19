<script lang="ts">
	import { getPageURL } from '$lib/messenger/get-page-url';
	import { type PgmApiOptions, create } from '$lib/public-good';

	let container: HTMLElement;

	const onload = async () => {
		const url = await getPageURL();

		const options: PgmApiOptions = {
			partnerId: 'gmg-guardian',
			attributes: {
				url,
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
