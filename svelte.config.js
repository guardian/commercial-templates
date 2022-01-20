import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		paths: {
			base: isDev ? undefined : '/commercial-templates',
		},

		// Github pages really likes its trailing slashes!
		trailingSlash: isDev ? 'never' : 'always',

		vite: defineConfig({
			plugins: [
				{
					name: 'watch-templates',
					configureServer(server) {
						server.watcher.add('/src/templates');
					},
					handleHotUpdate(ctx) {
						const TEMPLATE =
							/\/templates\/([\w-\/]+?)\/[\w-]+?\.svelte$/i;
						const matches = TEMPLATE.exec(ctx.file);

						if (!matches) return ctx.modules;

						console.warn(
							`Template ${matches[1]} changed`,
							'sending template-update event',
						);

						/** @type {import('./src/lib/reload').Data} */
						const data = {
							id: matches[1],
						};

						ctx.server.ws.send({
							type: 'custom',
							event: 'template-update',
							data,
						});

						return [];
					},
				},
			],
		}),
	},
};

export default config;
