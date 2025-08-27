import { post } from '$lib/messenger';

post({
	type: 'background',
	value: {
		scrollType: 'fixed',
		backgroundImage: `url('[%BackgroundImage%]')`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		ctaUrl: '%%CLICK_URL_UNESC%%%%DEST_URL_ESC%%',
		videoSource: `[%VideoSource%]`,
	},
});

post({
	type: 'set-ad-height',
	value: {
		width: -1,
		height: -1,
	},
});

export {};
