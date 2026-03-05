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
			void invalidate(`/${data.id}.json`);

			// if a shared component is updated, update all templates
			if (data.id.startsWith('components')) {
				void invalidate(`/csr/${template}.json`);
				void invalidate(`/ssr/${template}.json`);
			}
		});
	}
};

export { reloadTemplate };
