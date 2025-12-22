<script lang="ts">
	import { isValidReplacedVariable } from '$lib/gam';

	if (!('window' in globalThis)) {
		throw new Error("Don't use the <Pixel /> component in SSR templates");
	}

	interface Props {
		src: string;
	}

	let { src }: Props = $props();
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
