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
export {};
