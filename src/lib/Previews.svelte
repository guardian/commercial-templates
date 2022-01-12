<script lang="ts">
	import { replaceGAMVariables } from '$lib/gam';

	export let template: string;
	export let html: string;
	export let props: Record<string, string> = {};

	$: transformed = `<body marginwidth="0" marginheight="0">${replaceGAMVariables(
		html,
		props,
	)}</body>`;

	export const widths = {
		1300: 'desktop',
		740: 'tablet',
		360: 'mobile',
	};
</script>

<section id="example">
	{#each Object.keys(widths) as width}
		<div class="size">
			<h4>
				{widths[width]} size ({width})
			</h4>
			<iframe
				title={`Template example for ${template}`}
				frameborder="0"
				{width}
				srcdoc={transformed}
				height="360"
			/>
		</div>
	{/each}
</section>

<section>
	<h3>Inputs</h3>

	<ul>
		{#each Object.keys(props) as prop}
			<li>
				{prop}: <input type="text" bind:value={props[prop]} />
			</li>
		{/each}
	</ul>
</section>

<style>
	#example {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.size {
		padding: 0;
		margin-right: calc(var(--grid-size) * 4);
		display: flex;
		flex-direction: column;
		width: max-content;
	}

	iframe {
		outline: var(--grid-size) solid var(--grid-color);
		background-color: white;
	}
</style>
