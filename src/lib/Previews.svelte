<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceGAMVariables } from '$lib/gam';
	import type { Message } from './messenger';
	import { tones } from './types/tones';

	const defaultReplacements: Record<string, string> = {
		CACHEBUSTER: '?cachebust',
		CLICK_URL_UNESC: '',
	};

	interface Props {
		template: string;
		html: string;
		css: string;
		templateProps?: Record<string, string>;
	}
	let { template, html, css, templateProps = {} }: Props = $props();

	let transformed = $derived(
		[
			'<',
			'style>',
			css,
			'</',
			'style>',

			'<body marginwidth="0" marginheight="0">',
			replaceGAMVariables(html, { ...defaultReplacements, ...templateProps }),
			'</body>',
		].join(''),
	);

	export const widths: Record<string, string> = {
		'100%': '100%',
		'1300': 'wide',
		'980': 'desktop',
		'740': 'tablet',
		'360': 'mobile',
	} as const;

	onMount(() => {
		window.addEventListener('message', (ev: MessageEvent<string>) => {
			if (!ev.isTrusted) return;

			const { source, data: json } = ev;

			let data;

			try {
				data = JSON.parse(json) as Message;
			} catch (e) {
				return;
			}

			if (!source) return;
			if (!('frameElement' in source)) return;

			const iframe = source.frameElement as HTMLIFrameElement;

			console.log('messenger message received', data);

			switch (data.type) {
				case 'set-ad-height':
				case 'resize':
					iframe.height = String(data.value.height);
					break;
				case 'get-page-url':
					source.postMessage(
						JSON.stringify({
							id: data.id,
							result:
								'https://www.theguardian.com/lifeandstyle/2023/jul/19/a-moment-that-changed-me-i-borrowed-a-dog-and-discovered-a-healthier-happier-way-of-life',
						}),
						'*',
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
		<div class="size" class:full-width={width === '100%'}>
			<h4>
				{widths[width]} size ({width})
			</h4>
			<iframe
				title={`Template example for ${template}`}
				frameborder="0"
				{width}
				srcdoc={transformed}
				name={`width-${width}`}
				height="700"
			/>
		</div>
	{/each}
</section>

<section>
	<h3>Inputs</h3>

	<ul>
		{#each Object.keys(templateProps) as prop}
			<li>
				{#if prop === 'Tone'}
					{prop}:
					<select bind:value={templateProps[prop]}>
						{#each tones as tone}
							<option value={tone}>{tone}</option>
						{/each}
					</select>
				{:else}
					{prop}: <input type="text" bind:value={templateProps[prop]} />
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
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

		&.full-width {
			width: 100%;
		}
	}

	iframe {
		outline: var(--grid-size) solid var(--grid-color);
		background-color: white;
	}
</style>
