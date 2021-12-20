<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const { template } = page.params;

		const endpoint = `/csr/${template}.json`;

		const { html, props } = await fetch(endpoint).then((r) => r.json());

		return {
			props: {
				template,
				html,
				props,
			},
		};
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
	export let props: Record<string, string> | undefined;
</script>

<Warning />

<h1>
	Template: {template}
</h1>
<Switcher mode="csr" {template} />

<Previews {html} {template} {props} />

<Code {html} css="/* TODO */" />
