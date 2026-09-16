<script lang="ts">
	import { addTrackingPixel, clickMacro, DEST_URL } from '$lib/gam';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { building } from '$app/environment';
	import { post } from '$lib/messenger';
	import Resizer from '$lib/components/Resizer.svelte';

	import ExpandedIcon from '$lib/components/icons/ExpandedIcon.svelte';
	import CollapsedIcon from '$lib/components/icons/CollapsedIcon.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let {
		ViewabilityTracker,
		TrackingPixel,
		ResearchPixel,
		ExpandedDesktop,
		ExpandedMobile,
		CollapsedDesktop,
		CollapsedMobile,
	} = data;

	let expandImageEl: HTMLImageElement | null = null;
	let collapsedImageEl: HTMLImageElement | null = null;

	let UI: HTMLElement | undefined = $state();
	let isExpanded = $state(true);
	let height: number = $state(0);

	onMount(async () => {
		UI?.classList.add('show');

		if (TrackingPixel) {
			addTrackingPixel(TrackingPixel);
		}

		if (ResearchPixel) {
			addTrackingPixel(ResearchPixel);
		}
	});

	const resetAdslot = () => {
		//after expanded image has loaded set the
		//initial height of the ad slot
		resizeFrameHeight().then(() => {
			// this will tell frontend to reset the min height on a fluid ad slot
			// to 'auto' instead of 250px
			//@ts-ignore
			post({ type: 'reset-height', value: true });
		});
	};

	const toggleExpand = () => {
		isExpanded = !isExpanded;
		if (expandImageEl != null && collapsedImageEl != null) {
			height = isExpanded ? expandImageEl.height : collapsedImageEl.height;
		}
	};

	const resizeFrameHeight = async () => {
		if (expandImageEl != null && collapsedImageEl != null) {
			height = isExpanded ? expandImageEl?.height : collapsedImageEl?.height;
		}
	};
</script>

<svelte:window on:resize={resizeFrameHeight} />
<base target="_blank" />
<div id="creative">
	<a id="creative-link" href={clickMacro(DEST_URL)}>
		<div class={[!isExpanded ? 'expanded' : '', 'panels']}>
			<picture>
				<source media="(max-width: 740px )" srcset={CollapsedMobile} />

				<!-- svelte-ignore a11y_missing_attribute -->
				<img bind:this={collapsedImageEl} src={CollapsedDesktop} />
			</picture>
		</div>
		<div class={[isExpanded ? 'expanded' : '', 'panels']}>
			<picture>
				<source media="(max-width: 740px )" srcset={ExpandedMobile} />

				<!-- svelte-ignore a11y_missing_attribute -->
				<img
					onload={() => resetAdslot()}
					bind:this={expandImageEl}
					src={ExpandedDesktop}
				/>
			</picture>
		</div>
	</a>

	<div aria-roledescription="Toggle" bind:this={UI} class="ui">
		<button onclick={() => toggleExpand()}>
			{#if isExpanded}
				<CollapsedIcon />
			{:else}
				<ExpandedIcon />
			{/if}
		</button>
	</div>
</div>
<Resizer {height} />

{@html ViewabilityTracker}

<!-- This will only add the GAM tag when pre-rendering as a raw string, these JS tags have been known to cause issues when injected into svelte's compiled JS by GAM -->
{#if building}
	[%thirdPartyJSTracking%]
{/if}

<style lang="scss">
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	button {
		touch-action: manipulation;
		outline: none;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	.panels {
		display: none;
	}

	.expanded {
		display: block;
	}

	.ui {
		opacity: 0;
		z-index: 5;
		position: absolute;
		top: 20px;
		left: calc(100% - (46px * 1.5));
		cursor: pointer;
		transition: opacity 0.5s;
	}

	:global(.ui.show) {
		opacity: 1;
	}
</style>
