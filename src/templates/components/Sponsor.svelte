<script lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
	import type { Branding } from '$lib/types/capi';

	export let branding: Branding;
	export let templateType: 'single' | 'multiple';

	const { logo } = branding;

	const { width, height } = logo.dimensions;
</script>

<div
	class={templateType === 'multiple'
		? 'multiple-logo-container'
		: 'single-logo-container'}
>
	<p>Paid for by</p>
	<a href={`${CLICK_MACRO}${branding.logo.link}`}>
		<img src={logo.src} alt="" style={`aspect-ratio: ${width} / ${height};`} />
	</a>
</div>

<style>
	div {
		color: #767676;
		font-size: 0.875rem;
		font-weight: bold;
		align-self: end;
		padding: 0;
	}

	.multiple-logo-container {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}

	img {
		width: 200px;
		max-width: 100px;
		max-height: 60px;
		margin-left: 10px;
		margin-right: 15px;
		vertical-align: middle;
	}

	p {
		margin: 0;
		padding-bottom: 3px;
		display: flex;
	}
</style>
