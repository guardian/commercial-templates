<script lang="ts">
	import type { PageData } from './$types';
	import type { Templates } from './+page.server';
	import { base } from '$app/paths';

	const explanations: Record<keyof Templates, string> = {
		csr: 'Dynamic',
		ssr: 'Static',
	};

	const branch = 'main';

	export let data: PageData;

	const { templates } = data;

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
						.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
						.join(' ')}</a
				>
			</li>
		{/each}
	</ol>
{/each}

<hr />

Learn how to create your first template:<a
	href={`https://github.com/guardian/commercial-templates/blob/${branch}/docs/svelte-template-authoring.md`}
	>src/templates/README.md</a
>

<hr />

<style>
	ol {
		margin: var(--grid-size) 0;
	}

	hr {
		margin: calc(3 * var(--grid-size)) 0;
		border: none;
		height: var(--grid-size);
		background-color: var(--grid-color);
	}
</style>
