<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const { template } = page.params;

		const endpoint = `/ssr/${template}.json`;

		const { html, css, props } = await fetch(endpoint).then((r) =>
			r.json(),
		);

		return {
			props: {
				template,
				html,
				css,
				props,
			},
		};
	};

	export const widths = {
		1300: 'desktop',
		740: 'tablet',
		375: 'mobile',
	};
</script>

<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Switcher from '$lib/Switcher.svelte';
	import Code from '$lib/Code.svelte';
	import Warning from '$lib/Warning.svelte';
	import Previews from '$lib/Previews.svelte';

	if (import.meta.hot) {
		import.meta.hot.on('template-update', (data) => {
			console.log(`Received invalidation for ${data.id}`);
			invalidate(`/${data.id}.json`);
		});
	}

	export let template: string;
	export let html: string;
	export let css: string;
	export let props: Record<string, string> | undefined;

	$: combined = [html, '<sty','le>', css, '</sty', 'le>'].join('');
</script>

<Warning />

<h1>
	Template: {template}
</h1>

<Switcher {template} mode="ssr" />

<Previews {template} html={combined} {props} />

<Code {html} {css} />
