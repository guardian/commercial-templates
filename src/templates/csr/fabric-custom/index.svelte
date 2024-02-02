<script lang="ts">
	import {
		clickMacro,
		DEST_URL,
		isValidReplacedVariable,
		type GAMVariable,
	} from '$lib/gam';
	import AdvertisementLabel from '$templates/components/AdvertisementLabel.svelte';
	import Pixel from '$templates/components/Pixel.svelte';
	import Resizer from '$templates/components/Resizer.svelte';

	const DapAssetsRoot = `https://s3-eu-west-1.amazonaws.com/adops-assets/dap-fabrics`;

	export let DapAssetsFolder: GAMVariable<string>;
	export let ThirdPartyTag: GAMVariable<string>;
	export let TrackingPixel: GAMVariable;
	export let ResearchPixel: GAMVariable;
	export let ViewabilityTracker: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;

	const DapAssetsPath = `${DapAssetsRoot}/${DapAssetsFolder}`;

	const replaceAssetLinks = (html: string) => {
		const re = /url\('\.\/(.*)'\)/g;
		return html.replace(re, `url('${DapAssetsPath}/$1')`);
	};

	const getTag = () => {
		if (DapAssetsFolder) {
			return fetch(`${DapAssetsPath}/index.html`)
				.then((res) => res.text())
				.then(replaceAssetLinks);
		} else if (ThirdPartyTag) {
			return fetch(ThirdPartyTag).then((res) => res.text());
		}
	};

	let height: number = -1;
</script>

<div bind:clientHeight={height}>
	<AdvertisementLabel />
	<a href={clickMacro(DEST_URL)}>
		{#await getTag()}
			<p>Loading...</p>
		{:then html}
			{@html html}
		{:catch error}
			<p>Something went wrong: {error.message}</p>
		{/await}
	</a>
</div>
<Pixel src={TrackingPixel} />
<Pixel src={ResearchPixel} />
<Resizer {height} />
{#if isValidReplacedVariable(ViewabilityTracker)}
	{@html ViewabilityTracker}
{/if}

{#if isValidReplacedVariable(thirdPartyJSTracking)}
	{@html thirdPartyJSTracking}
{/if}

<style lang="scss">
	:global(body) {
		margin: 0;
	}
</style>
