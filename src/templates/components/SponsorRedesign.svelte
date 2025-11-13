<script lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
	import type { Branding } from '$lib/types/capi';

	export let branding: Branding;
</script>

<div>
	<p>Paid for by</p>
	<a href={`${CLICK_MACRO}${branding.logo.link}`}>
		<img src={branding.logo.src} alt={`logo for ${branding.sponsorName}`} />
	</a>
</div>

<style>
	div {
		display: flex;
		justify-content: end;
		color: var(--labs-100);
		font-size: 0.875rem;
		font-weight: bold;
		align-self: end;
		padding: 0;

		align-items: center;
		margin-bottom: 15px;
	}

	img {
		max-width: 120px;
		max-height: 60px;
		margin-left: 10px;
		vertical-align: middle;
	}

	p {
		margin: 0;
		padding-bottom: 3px;
		display: flex;
	}
</style>
