import { post } from '$lib/messenger';

// this will tell frontend to add the 'ad-slot--interscroller' class to the ad slot
post({
	type: 'type',
	value: 'interscroller'
});

post({
	type: 'background',
	value: {
		scrollType: 'interscroller',
		backgroundImage: `url('[%BackgroundImage%]')`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		ctaUrl: `%%CLICK_URL_UNESC%%%%DEST_URL%%`,
		videoSource: `[%VideoSource%]`
	}
});

post({
	type: 'resize',
	value: {
		height: '85vh'
	}
});

export {};
