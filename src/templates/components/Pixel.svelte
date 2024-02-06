<script lang="ts">
	export let src: string;
</script>

<img {src} alt="" />

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
