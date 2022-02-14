import { post } from '$lib/messenger';

post({
	type: 'set-ad-height',
	value: {
		width: -1,
		height: 250,
	},
});

export {};
