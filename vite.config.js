/* eslint-disable import/no-default-export -- vite config */
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		{
			name: 'watch-templates',
			configureServer(server) {
				server.watcher.add('/src/templates');
			},
			handleHotUpdate(ctx) {
				const TEMPLATE =
					/\/templates\/([\w-/]+?)\/[\w-]+?\.(svelte|js|ts|md|css|json)$/i;
				const matches = TEMPLATE.exec(ctx.file);

				const match = matches ? matches[1] : null;

				if (!match) return ctx.modules;


				console.warn(
					`Template ${match} changed`,
					'sending template-update event',
				);

				/** @type {import('./src/lib/reload').Data} */
				const data = {
					id: match,
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
};

export default config;
