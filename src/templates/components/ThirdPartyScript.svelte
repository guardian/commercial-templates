<script>
	const scriptSource =
		'https://pixel.adsafeprotected.com/rjss/st/726370/54949606/skeleton.js';

	const imageSource =
		'https://pixel.adsafeprotected.com/rfw/st/726370/54949605/skeleton.gif?gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_278}&gdpr_pd=${GDPR_PD}';
</script>

<svelte:head>
	<script src={scriptSource}></script>
</svelte:head>

<noscript>
	<img src={imageSource} width="1" height="1" alt="" />
</noscript>
