<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="creative--interscroller">
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		src={data.TrackingPixel}
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		src={data.ResearchPixel}
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		src={data.ViewabilityPixel}
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	{@html data.thirdPartyJSTracking}
</div>

<style lang="scss">
	.creative--interscroller {
		margin-top: 24px;
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
