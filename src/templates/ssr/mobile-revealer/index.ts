import { post } from '$lib/messenger';

post({
	type: 'background',
	value: {
		scrollType: 'fixed',
		backgroundImage: `url('[%BackgroundImage%]')`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		transform: 'translate3d(0,0,0)',
	},
});

post({
	type: 'resize',
	value: {
		height: '250px',
	},
});

export {};
