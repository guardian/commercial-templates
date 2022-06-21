<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Templates } from './templates.json';
	import { base } from '$app/paths';

	export const load: Load = async ({ fetch }) => {
		const templates: Templates = await fetch(`${base}/templates.json`).then(
			(r) => r.json(),
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
		legacy: 'Deprecated',
	};

	const branch = 'main';
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

<hr />

Learn how to create your first template: <a
	href={`https://github.com/guardian/commercial-templates/blob/${branch}/src/templates/README.md`}
	>src/templates/README.md</a
>

<hr />

<h2>Legacy: not yet converted</h2>
<ul>
	{#each templates['legacy'] as template}
		<li
			class={[...templates.csr, ...templates.ssr].includes(template)
				? 'del'
				: ''}
		>
			<a
				href={`https://github.com/guardian/commercial-templates/blob/${branch}/legacy/src/${template}`}
			>
				{template
					.split('-')
					.map(
						(word) =>
							word.slice(0, 1).toUpperCase() + word.slice(1),
					)
					.join(' ')}
			</a>
		</li>
	{/each}
</ul>

<style>
	ol,
	ul {
		margin: var(--grid-size) 0;
	}

	ul {
		column-count: 3;
	}

	.del {
		opacity: 0.42;
		text-decoration: line-through;
	}

	hr {
		margin: calc(3 * var(--grid-size)) 0;
		border: none;
		height: var(--grid-size);
		background-color: var(--grid-color);
	}
</style>
