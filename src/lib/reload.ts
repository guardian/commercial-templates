import { invalidate } from '$app/navigation';

export type Data = {
	id: string;
};

const reloadTemplate = (template: string) => {
	if (import.meta.hot) {
		import.meta.hot.on('template-update', (data: Data) => {
			console.log(`Received invalidation for ${data.id}`);
			invalidate(`/${data.id}.json`);

			if (data.id.startsWith('components')) {
				invalidate(`/csr/${template}.json`);
				invalidate(`/ssr/${template}.json`);
			}
		});
	}
};

export { reloadTemplate };
