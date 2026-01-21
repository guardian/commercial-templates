<script lang="ts">
	import { onMount } from 'svelte';
	import { post } from '$lib/messenger';
	import { building } from '$app/environment';
	import type { PageData } from './$types';
	import { CACHE_BUST } from '$lib/gam';

	export let data: PageData;

	let {
		BackgroundImage,
		Button,
		ButtonVerticalPosition,
		ButtonHorizontalPosition,
		TrackingPixel,
		ResearchPixel,
		ViewabilityTracker,
	} = data;

	onMount(() => {
		post({
			type: 'background',
			value: {
				scrollType: 'fixed',
				backgroundImage: `url('${BackgroundImage}')`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
				transform: 'translate3d(0,0,0)',
			},
		});

		post({
			type: 'resize',
			value: {
				height: '250px',
			},
		});
	});
</script>

<div class="creative creative--revealer">
	<a
		class="creative__cta"
		href="%%CLICK_URL_UNESC%%%%DEST_URL_ESC%%"
		target="_blank"
	>
		<img
			class="creative__button creative__button--${ButtonVerticalPosition} creative__button--${ButtonHorizontalPosition}"
			src="${Button}"
			alt="button"
		/>
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="${TrackingPixel}${CACHE_BUST}"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="${ResearchPixel}${CACHE_BUST}"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="${ViewabilityTracker}"
		class="creative__pixel creative__pixel--displayNone"
		aria-hidden="true"
	/>

	<!-- This will only add the GAM tag when pre-rendering as a raw string, these JS tags have been known to cause issues when injected into svelte's compiled JS by GAM -->
	{#if building}
		[%thirdPartyJSTracking%]
	{/if}
</div>

<style lang="scss">
	.creative--revealer {
		height: 250px;
		position: relative;

		.creative__cta {
			position: absolute;
			height: 100%;
			width: 100%;
			clip: rect(0, auto, auto, 0);
			overflow: hidden;

			/* promoting the button up the layer stack will improve
           perfs on Android devices */
			z-index: 1;
		}

		.creative__button {
			position: absolute;
		}

		/* Options to position the button layer */
		:global(.creative__button--left) {
			left: 0;
		}
		:global(.creative__button--center) {
			left: 50%;
			transform: translate(-50%, 0);
		}
		:global(.creative__button--right) {
			right: 0;
		}

		:global(.creative__button--top) {
			top: 0;
		}
		:global(.creative__button--middle) {
			top: 50%;
			transform: translate(0, -50%);
		}
		:global(.creative__button--bottom) {
			bottom: 0;
		}

		:global(.creative__button--center.creative__button--middle) {
			transform: translate(-50%, -50%);
		}
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
