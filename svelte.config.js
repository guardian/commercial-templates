import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: defineConfig({
			plugins: [
				{
					name: 'watch-templates',
					configureServer(server) {
						server.watcher.add('/src/templates');
					},
					handleHotUpdate(ctx) {
						const TEMPLATE = /([\w-]+?)\/[\w-]+?\.(ts|svelte)$/i;
						const matches = TEMPLATE.exec(ctx.file);

						if (!matches) return ctx.modules;

						ctx.server.ws.send({
							type: 'custom',
							event: 'template-update',
							data: {
								id: matches[1],
							},
						});

						return [];
					},
				},
			],
		}),
	},
};

export default config;
