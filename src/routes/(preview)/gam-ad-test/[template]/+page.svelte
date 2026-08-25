<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const template = $derived(data.template);

	const adSlotId = 'dfp-ad--top-above-nav';
	const adUnitPath = '/59666047/theguardian.com/sport/article/ng';
	const slotSizes: Array<[number, number] | 'fluid'> = ['fluid'];
	let slot: googletag.Slot | null = null;

	const ensureGptScript = () => {
		if (!browser) return;

		// cmd.push still adds to the queue before gpt.js loads
		window.googletag = window.googletag || { cmd: [] };

		if (document.querySelector('script[data-gpt="true"]')) return;

		const s = document.createElement('script');
		s.async = true;
		s.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
		s.dataset.gpt = 'true';
		document.head.appendChild(s);
	};

	onMount(() => {
		ensureGptScript();

		window.googletag.cmd.push(() => {
			const api = window.googletag;
			if (!api) return;

			const existing = api
				.pubads()
				.getSlots()
				.find((s) => s.getSlotElementId() === adSlotId);
			if (existing) {
				api.display(adSlotId);
				return;
			}

			slot = api.defineSlot(adUnitPath, slotSizes, adSlotId);
			if (!slot) return;

			slot.addService(api.pubads());
			slot.setConfig({ targeting: { slot: 'top-above-nav' } });
			api.setConfig({ targeting: { at: `commdev-${template}-test` } });
			api.enableServices();
			api.display(adSlotId);

			const el = document.getElementById(adSlotId);
			if (el) el.dataset.gptLoaded = 'true';
		});
	});

	onDestroy(() => {
		if (!browser) return;
		window.googletag.cmd.push(() => {
			if (slot) {
				window.googletag.destroySlots([slot]);
				slot = null;
			}
		});
	});
</script>

<h1>Guardian Ad</h1>
<h2>loaded from GAM</h2>

<div class="ad-wrapper">
	<div id={adSlotId} class="ad"></div>
</div>

<style lang="scss">
	h1 {
		font-size: 16px;
		color: #052962;
		margin-bottom: 4px;
	}

	h2 {
		font-size: 12px;
		font-weight: 400;
		color: #767676;
		margin: 0 0 20px;
	}

	.ad-wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.ad {
		background: #fff;
		border: 1px dashed #ccc;
		width: 100%;
		max-width: 1200px;
		min-height: 250px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ad :global(iframe) {
		max-width: 100%;
	}
</style>
