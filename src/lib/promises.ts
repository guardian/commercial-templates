export const timeout = (promise: Promise<unknown>, delay: number) => {
	return Promise.race([
		new Promise((resolve) => window.setTimeout(resolve, delay)),
		promise,
	]);
};
