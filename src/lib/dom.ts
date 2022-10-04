const write = async (fn: () => void, ...args: []) => {
	return await new Promise((resolve) =>
		window.requestAnimationFrame(() => {
			resolve(fn(...args));
		}),
	).catch(() => {
		console.log('no arguments');
	});
};

export { write };
