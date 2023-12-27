<script lang="ts">
</script>

<div class="gs-container label label">
	<div class="label-text">Advertisement</div>
</div>

<style lang="scss">
	@import './colours/palette.scss';
	$gs-gutter: 20px;
	$gs-max-columns: 16;
	$f-sans-serif-text: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica,
		Arial, 'Lucida Grande', sans-serif !default;

	.gs-container {
		position: relative;

		@media (min-width: 740px) {
			padding: 0 calc(50% - #{(gs-span(9) + $gs-gutter * 2) / 2});
		}

		@media (min-width: 980px) {
			padding: 0 calc(50% - #{(gs-span(12) + $gs-gutter * 2) / 2});
		}

		@media (min-width: 1140px) {
			padding: 0 calc(50% - #{(gs-span(14) + $gs-gutter * 2) / 2});
		}

		@media (min-width: 1300px) {
			padding: 0 calc(50% - #{(gs-span($gs-max-columns) + $gs-gutter * 2) / 2});
		}
	}

	.label {
		background-color: $neutral-8;
		border-top: 1px solid $neutral-5;
		color: #6e6e6e;
		font: normal 0.75rem/1.9 $f-sans-serif-text;
		height: 2em;
		box-sizing: border-box;
	}

	.label-text {
		padding: 0 $gs-gutter / 2;

		@media (min-width: 740px) {
			padding: 0 $gs-gutter;
		}
	}
</style>
