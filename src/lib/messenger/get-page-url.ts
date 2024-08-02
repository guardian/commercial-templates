import { postAndListen } from '$lib/messenger';

const getPageURL = () => {
	return postAndListen({ type: 'get-page-url', value: '' }) as Promise<string>;
};

export { getPageURL };
