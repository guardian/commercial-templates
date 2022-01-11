import { invalidate } from '$app/navigation';

const reloadTemplate = (template: string) => {
	if (import.meta.hot) {
		import.meta.hot.on('template-update', (data) => {
			console.log(`Received invalidation for ${data.id}`);
			invalidate(`/${data.id}.json`);

			if (data.id === 'components') {
				invalidate(`/csr/${template}.json`);
				invalidate(`/ssr/${template}.json`);
			}
		});
	}
};

export { reloadTemplate };
