<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const { template } = page.params;

		const endpoint = page.query.get("ssr") ? `/ssr/${template}.json` : `/${template}.json`
		const { html } = await fetch(endpoint).then((r) => r.json());

		return {
			props: {
				template,
				html,
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
	import { replaceGAMVariables } from '$lib/replace';

	if (import.meta.hot) {
		import.meta.hot.on('template-update', (data) => {
			console.log(`Received invalidation for ${data.id}`)
			if(data.id === "lib") invalidate(`/${template}.json`);
			invalidate(`/${data.id}.json`);
		});
	}

	export let template: string;
	export let html: string;
	$: transformed = replaceGAMVariables(html, { info: 'My Data' });
</script>

<aside id="warning">
	⚠️ WARNING: it is recommended you view this development page with a viewport
	of at least 1300px
</aside>

<h1>
	Template: {template}
</h1>

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
		outline: 10px solid darkblue;
		background-color: white;
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

	#warning {
		display: block;
		position: sticky;
		top: 0;
		left: 0;
		padding: 0.5rem;
		background-color: darkred;
		color: rgb(255, 196, 0);
		text-align: center;
	}
	@media screen and (min-width: 1300px) {
		#warning {
			display: none;
		}
	}
</style>
