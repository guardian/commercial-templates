<script lang="ts"></script>

<div class="gs-container creative__label creative__label">
	<div class="creative__label-text">Advertisement</div>
</div>

<style lang="scss">
	@import './src/_shared/scss/_core';
	
	.creative__label {
		background-color: $neutral-8;
		border-top: 1px solid $neutral-5;
		color: #6e6e6e;
		font: normal 0.75rem/1.9 $f-sans-serif-text;
		height: 2em;
		box-sizing: border-box;
	}

	.creative__label-text {
		padding: 0 $gs-gutter / 2;

		@include mq(tablet) {
			padding: 0 $gs-gutter;
		}
	}
</style>
