<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let { thirdPartyJSTracking } = data;
</script>

<div class="creative--interscroller">
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		src="[TrackingPixel]"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		src="[ResearchPixel]"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		src="[ViewabilityTracker]"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	{@html thirdPartyJSTracking}
</div>

<style lang="scss">
	.creative--interscroller {
		margin-top: 24px;
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
