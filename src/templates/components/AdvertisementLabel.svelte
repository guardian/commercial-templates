<script lang="ts">
	export let fullWidth: boolean;
</script>

<div class="container" class:fullWidth>
	<div class="text">Advertisement</div>
</div>

<style lang="scss">
	@import './fonts/Sans.css';

	.container {
		position: relative;
		height: 2em;
		background-color: #f6f6f6;
		border-top: 1px solid #dcdcdc;
		color: #707070;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		font-size: 0.75rem;
		line-height: 1.9;
		font-weight: 400;
		box-sizing: border-box;

		&.fullWidth {
			padding: 0 calc(50% - 650px); // Keep the label central for large screens
		}

		&:not(.fullWidth) {
			margin: 0 auto;
			@media (min-width: 740px) {
				max-width: 740px;
			}
			@media (min-width: 980px) {
				max-width: 980px;
			}
			@media (min-width: 1140px) {
				max-width: 1140px;
			}
			@media (min-width: 1300px) {
				max-width: 1300px;
			}
		}
	}

	.text {
		padding: 0 10px;

		@media (min-width: 740px) {
			padding: 0 20px;
		}
	}
</style>
