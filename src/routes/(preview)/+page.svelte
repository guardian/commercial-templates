<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	const branch = 'main';

	export let data: PageData;

	const { templates } = data;
</script>

<h1>Commercial Templates</h1>

<table>
	<thead>
		<tr>
			<th>Template</th>
			<th>Preview in GAM</th>
		</tr>
	</thead>
	<tbody>
		{#each templates as template}
			<tr>
				<td>
					<a href={resolve(`/preview/${template.name}`)}
						>{template.name
							.split('-')
							.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
							.join(' ')}</a
					>
				</td>
				<td>
					{#if template.creativeId}
						<a
							href={`https://admanager.google.com/59666047#creatives/creative/detail/line_item_id=7228230439&creative_id=${template.creativeId}&tab=preview`}
							target="_blank">{template.creativeId}</a
						>
					{:else}
						N/A
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<hr />

Learn how to create your first template:<a
	href={`https://github.com/guardian/commercial-templates/blob/${branch}/docs/svelte-template-authoring.md`}
	>docs/svelte-template-authoring.md</a
>

<hr />

<style lang="scss">
	table {
		margin: var(--grid-size) 0;
		border-collapse: collapse;
		width: 400px;
	}

	th,
	td {
		padding: calc(var(--grid-size) / 2) var(--grid-size);
		text-align: left;
		border-bottom: 1px solid var(--grid-color);
	}

	th {
		font-weight: 600;
		background-color: var(--grid-color);
	}

	hr {
		margin: calc(3 * var(--grid-size)) 0;
		border: none;
		height: var(--grid-size);
		background-color: var(--grid-color);
	}
</style>
