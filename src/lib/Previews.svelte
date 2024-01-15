<script context="module" lang="ts">
	const defaultReplacements: Record<string, string> = {
		CACHEBUSTER: '?cachebust',
		CLICK_URL_UNESC: ''
	};
</script>

<script lang="ts">
	import { replaceGAMVariables } from '$lib/gam';
	import { onMount } from 'svelte';
	import type { Message } from './messenger';
	import { tones } from './types/tones';

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
		'</body>'
	].join('');

	export const widths: Record<string, string> = {
		'1300': 'wide',
		'980': 'desktop',
		'740': 'tablet',
		'360': 'mobile'
	} as const;

	onMount(() => {
		window.addEventListener('message', (ev: MessageEvent<string>) => {
			if (!ev.isTrusted) return;

			const { source, data: json } = ev;

			const data = JSON.parse(json);

			if (!source) return;
			if (!('frameElement' in source)) return;

			switch (data.type) {
				case 'set-ad-height':
					const iframe = source.frameElement as HTMLIFrameElement;
					iframe.height = String(data.value.height);
					break;
				case 'get-page-url':
					source.postMessage(
						JSON.stringify({
							id: data.id,
							result:
								'https://www.theguardian.com/lifeandstyle/2023/jul/19/a-moment-that-changed-me-i-borrowed-a-dog-and-discovered-a-healthier-happier-way-of-life'
						}),
						'*'
					);
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
				height="360"
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
				{#if prop === 'Tone'}
					{prop}:
					<select bind:value={props[prop]}>
						{#each tones as tone}
							<option value={tone}>{tone}</option>
						{/each}
					</select>
				{:else}
					{prop}: <input type="text" bind:value={props[prop]} />
				{/if}
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
