<script lang="ts">
	import { building } from '$app/environment';
	import type { PageData } from './$types';
	import { CACHE_BUST } from '$lib/gam';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { BackgroundImageX1, BackgroundImageX2, AdWidth, AdHeight } = data;
</script>

<div
	class="creative creative--image"
	style:--width={`${AdWidth}px`}
	style:--height={`${AdHeight}px`}
>
	<a
		class="creative__cta"
		href="%%CLICK_URL_UNESC%%%%DEST_URL_ESC%%"
		target="_blank"
	>
		<picture>
			<source srcset={`${BackgroundImageX1}, ${BackgroundImageX2} 2x`} />
			<!-- svelte-ignore a11y_missing_attribute -->
			<img src={BackgroundImageX1} width={AdWidth} height={AdHeight} />
		</picture>
	</a>
	<!-- svelte-ignore a11y_missing_attribute -->
	{#if data.TrackingPixel}
		<img
			src="{data.TrackingPixel}{CACHE_BUST}"
			class="creative__pixel creative__pixel--displayNone"
			aria-hidden="true"
		/>
	{/if}
	<!-- svelte-ignore a11y_missing_attribute -->
	{#if data.ResearchPixel}
		<img
			src="{data.ResearchPixel}{CACHE_BUST}"
			class="creative__pixel creative__pixel--displayNone"
			aria-hidden="true"
		/>
	{/if}
	<!-- svelte-ignore a11y_missing_attribute -->
	{#if data.ViewabilityTracker}
		<img
			src={data.ViewabilityTracker}
			class="creative__pixel creative__pixel--displayNone"
			aria-hidden="true"
		/>
	{/if}

	<!-- This will only add the GAM tag when pre-rendering as a raw string, these JS tags have been known to cause issues when injected into svelte's compiled JS by GAM -->
	{#if building}
		[%thirdPartyJSTracking%]
	{/if}
</div>

<style lang="scss">
	:global(body) {
		margin: 0;
	}

	.creative {
		&--image {
			width: var(--width);
			height: var(--height);
			margin-inline: auto;
		}

		&__pixel--displayNone {
			display: none;
		}
	}
</style>
