<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
	import { post } from '$lib/messenger';

	post({
		type: 'background',
		value: {
			scrollType: 'interscroller',
			backgroundImage: `url('[%BackgroundImage%]')`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			backgroundSize: 'cover',
			ctaUrl: `%%CLICK_URL_UNESC%%%%DEST_URL%%`,
		},
	});

	post({
		type: 'set-ad-height',
		value: {
			width: -1,
			height: '85vh',
		},
	});
</script>

<div class="creative--interscroller">
	<img
		src="[%TrackingPixel%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
	<img
		src="[%ResearchPixel%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
	<img
		src="[%ViewabilityTracker%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
</div>

<style lang="scss">
	.creative--interscroller {
		margin-top: 24px;
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
