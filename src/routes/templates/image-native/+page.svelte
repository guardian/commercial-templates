<script lang="ts">
	import { building } from '$app/environment';
	import type { PageData } from './$types';
	import { CACHE_BUST } from '$lib/gam';

	export let data: PageData;

	let {
		BackgroundImageX1,
		BackgroundImageX2,
		adWidth,
		adHeight,
		TrackingPixel,
		ResearchPixel,
		ViewabilityTracker,
	} = data;
</script>

<div
	class="creative creative--image"
	style:--width={adWidth}
	style:--height={adHeight}
>
	<a
		class="creative__cta"
		href="%%CLICK_URL_UNESC%%%%DEST_URL_ESC%%"
		target="_blank"
	>
		<picture>
			<source srcset={`${BackgroundImageX1}, ${BackgroundImageX2} 2x`} />
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src={BackgroundImageX1} width={adWidth} height={adHeight} />
		</picture>
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="{TrackingPixel}{CACHE_BUST}"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="{ResearchPixel}{CACHE_BUST}"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src={ViewabilityTracker}
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>

	<!-- This will only add the GAM tag when pre-rendering as a raw string, these JS tags have been known to cause issues when injected into svelte's compiled JS by GAM -->
	{#if building}
		[%thirdPartyJSTracking%]
	{/if}
</div>

<style lang="scss">
	.creative {
		&--image {
			//unitless variable from GAM using
			//calc to force to px
			width: calc(var(--width) * 1px);
			height: calc(var(--height) * 1px);
		}

		&__pixel--displayNone {
			display: none;
		}
	}
</style>
