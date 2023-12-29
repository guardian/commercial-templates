<div class="gs-container label">
	<div class="label-text">Advertisement</div>
</div>

<style lang="scss">
	@import './fonts/Sans.css';
	@import './colours/palette.scss';
	@import '../../styles/helpers.scss';
	$gs-gutter: 20px;
	$f-sans-serif-text: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica,
		Arial, 'Lucida Grande', sans-serif !default;
	.label {
		background-color: $neutral-8;
		border-top: 1px solid $neutral-5;
		color: #6e6e6e;
		font: normal 0.75rem/1.9 $f-sans-serif-text;
		height: 2em;
		box-sizing: border-box;
	}

	.label-text {
		padding: 0 calc($gs-gutter / 2);

		@media (min-width: 740px) {
			padding: 0 $gs-gutter;
		}
	}
</style>
