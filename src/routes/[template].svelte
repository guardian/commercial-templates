<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const { template } = page.params;

		const { html } = await fetch(`/${template}.json`).then((r) => r.json());

		return {
			props: {
				template,
				html
			}
		};
	};

	export const widths = {
		1300: 'desktop',
		740: 'tablet',
		375: 'mobile'
	};
</script>

<script lang="ts">
	export let template: string;
	export let html: string;
</script>

<h1>
	This is a template called {template}
</h1>

<section id="example">
	{#each Object.keys(widths) as width}
		<div class="size">
			<h4>
				{widths[width]} size ({width})
			</h4>
			<!-- src={`/preview/${template}`} -->
			<iframe
				title={`Template example for ${template}`}
				frameborder="0"
				{width}
				srcdoc={html}
				height="250"
			/>
		</div>
	{/each}
</section>

<section id="code">
	<div class="html">
		<h2>HTML</h2>
		<pre>{html}</pre>
	</div>
	<div>
		<h2>CSS</h2>
		<pre>/* TBC */</pre>
	</div>
</section>

<style>
	#example {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.size {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		width: max-content;
	}

	iframe {
		outline: 0.25rem solid aquamarine;
	}

	#code {
		display: grid;
		grid-template-columns: repeat(2, 40%);
		gap: 5%;
	}

	pre {
		white-space: pre-wrap;
		word-break: break-all;
	}
</style>
