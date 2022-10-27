<script context="module" lang="ts">
	const defaultReplacements: Record<string, string> = {
		CACHEBUSTER: '?cachebust',
		CLICK_URL_UNESC: '',
	};
</script>

<script lang="ts">
	import { replaceGAMVariables } from '$lib/gam';
	import { onMount } from 'svelte';
	import type { Message } from './messenger';

	export let template: string;
	export let html: string;
	export let css: string;
	export let props: Record<string, string> = {};

	$: transformed = [
		'<',
		'style>',
		css,
		'</',
		'style>',

		'<body marginwidth="0" marginheight="0">',
		replaceGAMVariables(html, { ...defaultReplacements, ...props }),
		'</body>',
	].join('');

	export const widths = {
		1300: 'desktop',
		740: 'tablet',
		480: 'mobileLandscape',
		360: 'mobile',
	};

	onMount(() => {
		window.addEventListener('message', (ev: MessageEvent<Message>) => {
			if (!ev.isTrusted) return;

			const { source, data: json } = ev;

			const data = JSON.parse(String(json));

			if (!source) return;
			if (!('frameElement' in source)) return;

			switch (data.type) {
				case 'set-ad-height':
					const iframe = source.frameElement as HTMLIFrameElement;
					iframe.height = String(data.value.height);
					break;

				default:
					break;
			}
		});
	});
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
				height="500"
				name={`width-${width}`}
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
