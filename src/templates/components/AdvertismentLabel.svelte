<script lang="ts">
	import { neutral, textSans, from } from '@guardian/source-foundations';

	const style = `
	background-color: ${neutral[97]};
	border-color: ${neutral[93]};
	font-family: ${textSans.small()}
`;
</script>

<div class="gs-container creative__label creative__label" {style}>
	<div
		class="creative__label-text"
		style={`padding: 0 10px;
		${from.tablet} {
			padding: 0 20px;
		}`}
	>
		Advertisement
	</div>
</div>

<style lang="scss">
	.creative__label {
		border-top: 1px solid;
		color: #6e6e6e;
		font: normal 0.75rem/1.9;
		height: 2em;
		box-sizing: border-box;
	}
</style>
