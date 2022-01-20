<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Templates } from './templates.json';
	import { base } from '$app/paths';

	export const load: Load = async ({ fetch }) => {
		const templates: Templates = await fetch(`${base}/templates.json`).then((r) =>
			r.json(),
		);

		return {
			props: {
				templates,
			},
		};
	};

	const explanations: Record<keyof Templates, string> = {
		csr: 'Dynamic',
		ssr: 'Static',
	};
</script>

<script lang="ts">
	export let templates: Templates;

	const modes: Array<keyof Templates> = ['csr', 'ssr'];
</script>

<h1>Commercial Templates</h1>

{#each modes as mode}
	<h2>{mode.toUpperCase()}: {explanations[mode]}</h2>
	<ol>
		{#each templates[mode] as template}
			<li>
				<a href={`${base}/${mode}/${template}`}
					>{template
						.split('-')
						.map(
							(word) =>
								word.slice(0, 1).toUpperCase() + word.slice(1),
						)
						.join(' ')}</a
				>
			</li>
		{/each}
	</ol>
{/each}

<p>
	This project is hosted on <a
		href="https://github.com/guardian/commercial-templates">on Github</a
	>.
</p>
