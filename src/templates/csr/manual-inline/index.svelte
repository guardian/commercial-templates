<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
	import '$templates/components/fonts/Sans.css';
	import '$templates/components/colours/tones.css';
	import type { GAMVariable } from '$lib/gam';
	import type { Tone } from '$lib/types/tones';
	import ManualInline from '$templates/components/ManualInline.svelte';

	export let TrackingId: GAMVariable;
	export let Tone: GAMVariable<Tone>;
	export let BaseUrl: GAMVariable;
	export let OfferUrl: GAMVariable;
	export let OfferTitle: GAMVariable;
	export let OfferImage: GAMVariable;
	export let OfferText: GAMVariable;
	export let OfferLinkText: GAMVariable;
</script>

<aside
	data-tone={Tone}
	data-link-name="creative | manual inline | {TrackingId}"
>
	<ManualInline
		tone={Tone}
		baseUrl={BaseUrl}
		offerUrl={OfferUrl}
		image={OfferImage}
		title={OfferTitle}
		linkText={OfferLinkText}
	>
		<svelte:fragment slot="title">
			{@html OfferTitle}
		</svelte:fragment>
		<svelte:fragment slot="text">
			{@html OfferText}
		</svelte:fragment>
	</ManualInline>
</aside>

<style lang="scss">
	aside {
		background: #ededed;
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-kerning: normal;
		text-rendering: optimizelegibility;
		font-variant-ligatures: common-ligatures;
	}
</style>
