<script lang="ts"></script>

<div class="creative creative--revealer">
	<a
		class="creative__cta"
		href="%%CLICK_URL_UNESC%%%%DEST_URL_ESC%%"
		target="_blank"
	>
		<!-- svelte-ignore a11y-missing-attribute -->
		<img
			class="creative__button creative__button--[%ButtonVerticalPosition%] creative__button--[%ButtonHorizontalPosition%]"
			src="[%Button%]"
			aria-hidden="true"
		/>
	</a>
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
	.creative--revealer {
		height: 250px;
		position: relative;

		.creative__cta {
			position: absolute;
			height: 100%;
			width: 100%;
			clip: rect(0, auto, auto, 0);
			overflow: hidden;

			/* promoting the button up the layer stack will improve
           perfs on Android devices */
			z-index: 1;
		}

		.creative__button {
			position: absolute;
		}

		.creative__button--left {
			left: 0;
		}
		.creative__button--center {
			left: 50%;
			transform: translate(-50%, 0);
		}
		.creative__button--right {
			right: 0;
		}

		.creative__button--top {
			top: 0;
		}
		.creative__button--middle {
			top: 50%;
			transform: translate(0, -50%);
		}
		.creative__button--bottom {
			bottom: 0;
		}

		.creative__button--center.creative__button--middle {
			transform: translate(-50%, -50%);
		}
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
