<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
</script>

<div class="creative--interscroller">
	<!-- svelte-ignore a11y-missing-attribute - no alt attribute needed for a pixel -->
	<img
		src="[%TrackingPixel%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
	<!-- svelte-ignore a11y-missing-attribute - no alt attribute needed for a pixel -->
	<img
		src="[%ResearchPixel%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
	<!-- svelte-ignore a11y-missing-attribute - no alt attribute needed for a pixel -->
	<img
		src="[%ViewabilityTracker%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
</div>

<style lang="scss">
	.creative--interscroller {
		margin-top: 24px;
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
