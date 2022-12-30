<script lang="ts">
	import type { GAMVariable } from '../../lib/gam';

	export let src: GAMVariable<
		'Trackingpixel' | 'Researchpixel' | 'Viewabilitypixel'
	>;
</script>

<img {src} alt="" />

<style>
	img {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
</style>
