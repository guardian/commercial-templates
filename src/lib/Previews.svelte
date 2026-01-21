<script lang="ts">
	import { onMount } from 'svelte';
	import type { Message } from './messenger';

	export let template: string;

	export let gamVariables: Record<string, string>;

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
	{#each Object.keys(widths) as width, i}
		<div class="size" class:full-width={width === '100%'}>
			<h4>
				{widths[width]} size ({width})
			</h4>
			<iframe
				title={`Template example for ${template}`}
				frameborder="0"
				{width}
				src="/templates/{template}"
				name={`width-${width}`}
				height="700"
			></iframe>
		</div>
	{/each}
</section>

<section>
	<h3>Variables</h3>
	<em
		>edit <span class="code">src/templates/{template}/variables.gam.ts</span> to update
		the preview's variables</em
	>
	<table class="inputs">
		{#each Object.entries(gamVariables) as [name, value]}
			<tr>
				<td>{name}</td>
				<td>{value}</td>
			</tr>
		{/each}
	</table>
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

	.code {
		font-family: monospace;
		background-color: rgba(0, 0, 0, 0.05);
		padding: 0.1rem 0.3rem;
		border-radius: 3px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.inputs {
		border-collapse: collapse;
		width: 100%;
		max-width: 600px;
		margin-top: var(--grid-size);
		font-family: monospace;
		font-size: 0.875rem;

		tr:nth-child(odd) {
			background-color: rgba(0, 0, 0, 0.02);
		}

		td {
			padding: calc(var(--grid-size) * 1.5) var(--grid-size);
			border: 1px solid rgba(0, 0, 0, 0.1);
			text-align: left;

			&:first-child {
				font-weight: 600;
				color: #333;
				width: 30%;
			}

			&:last-child {
				color: #666;
				word-break: break-word;
			}
		}
	}
</style>
