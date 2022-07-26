<script context="module" lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
</script>

<script lang="ts">
	import type { Branding } from '$lib/types/capi';

	export let branding: Branding;

	const { logo } = branding;

	const { width, height } = logo.dimensions;
</script>

<div>
	<p>Paid for by</p>
	<a href={`${CLICK_MACRO}${branding.logo.link}`}>
		<img
			src={logo.src}
			alt=""
			style={`aspect-ratio: ${width} / ${height};`}
		/>
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

	img {
		width: 200px;
	}

	p {
		margin: 0;
		padding-bottom: 3px;
	}
</style>
