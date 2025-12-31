<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	const branch = 'main';

	export let data: PageData;

	const { templates } = data;
</script>

<h1>Commercial Templates</h1>

<ol>
	{#each templates as template}
		<li>
			<a href={resolve(`/preview/${template.name}`)}
				>{template.name
					.split('-')
					.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
					.join(' ')}</a
			>
			(<a
				href="https://admanager.google.com/59666047#creatives/native/native_style/detail/style_id={template.id}"
				target="_blank">{template.id}</a
			>)
		</li>
	{/each}
</ol>

<hr />

Learn how to create your first template:<a
	href={`https://github.com/guardian/commercial-templates/blob/${branch}/docs/svelte-template-authoring.md`}
	>docs/svelte-template-authoring.md</a
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
