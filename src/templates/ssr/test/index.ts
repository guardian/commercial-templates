import { post } from '$lib/messenger';

const svelte = document.querySelector('#svelte') as Element;

const height = svelte.clientHeight;

post({
	type: 'set-ad-height',
	value: {
		width: -1,
		height,
	},
});
