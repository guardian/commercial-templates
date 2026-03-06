<script lang="ts">
    import type { GAMVariable } from '../../lib/gam';
	export let src: GAMVariable;
</script>

<img src="{src}" alt="" />

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