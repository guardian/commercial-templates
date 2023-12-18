import { postAndListen } from '$lib/messenger';

interface ViewportResponse {
	width: number;
	height: number;
}

const isViewportReply = (json: unknown): json is ViewportResponse => {
	const reply = json as ViewportResponse;
	return (
		'width' in reply &&
		'height' in reply &&
		typeof reply.width === 'number' &&
		typeof reply.height === 'number'
	);
};
const onViewport = async () => {
	const response = await postAndListen({ type: 'viewport', value: '' });

	if (!isViewportReply(response)) {
		throw new Error('Invalid onViewport response');
	}

	return response;
};

export { onViewport };
