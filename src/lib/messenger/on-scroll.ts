import { postAndListen } from '$lib/messenger';

interface ScrollResponse {
	width: number;
	height: number;
	top: number;
	bottom: number;
	left: number;
	right: number;
}

const isScrollReply = (json: unknown): json is ScrollResponse => {
	const reply = json as ScrollResponse;
	return (
		'width' in reply &&
		'height' in reply &&
		'top' in reply &&
		'bottom' in reply &&
		'left' in reply &&
		'right' in reply &&
		typeof reply.width === 'number' &&
		typeof reply.height === 'number' &&
		typeof reply.top === 'number' &&
		typeof reply.bottom === 'number' &&
		typeof reply.left === 'number' &&
		typeof reply.right === 'number'
	);
};
const onScroll = async () => {
	const response = await postAndListen({ type: 'scroll', value: '' });

	if (!isScrollReply(response)) {
		throw new Error('Invalid onScroll response');
	}

	return response;
};

export { onScroll };
