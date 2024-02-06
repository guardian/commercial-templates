<script lang="ts">
	import { isValidReplacedVariable } from '$lib/gam';

	export let src: string;
</script>

{#if isValidReplacedVariable(src)}
	<img {src} alt="" />
{/if}

<style lang="scss">
	img {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
</style>
