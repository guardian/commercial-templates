<script lang="ts">
</script>

<div class="creative--interscroller">
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="[%TrackingPixel%]"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="[%ResearchPixel%]"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="[%ViewabilityTracker%]"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
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
