import { invalidate } from '$app/navigation';

export type Data = {
	id: string;
};

/**
 * Handles vite hot module reloading via svelte’s invalidation
 * @param template - the `id` of the template to reload
 */
const reloadTemplate = (template: string) => {
	if (import.meta.hot) {
		import.meta.hot.on('template-update', (data: Data) => {
			console.log(`Received invalidation for ${data.id}`);
			invalidate(`/${data.id}.json`);

			// if a shared component is updated, update all templates
			if (data.id.startsWith('components')) {
				invalidate(`/csr/${template}.json`);
				invalidate(`/ssr/${template}.json`);
			}
		});
	}
};

export { reloadTemplate };
