<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Tone } from '$lib/types/tones';
	import BookSvg from './icons/BookshopLogo.svelte';
	import BrandSvg from './icons/BrandLogo.svelte';
	import GenericSvg from './icons/GenericLogo.svelte';
	import TravelSvg from './icons/HolidaysLogo.svelte';
	import JobsSvg from './icons/JobsLogo.svelte';
	import LiveSvg from './icons/LiveLogo.svelte';
	import MembersSvg from './icons/MembersLogo.svelte';
	import MoneySvg from './icons/MoneydealsLogo.svelte';
	import PatronSvg from './icons/PatronLogo.svelte';
	import SubscriptionSvg from './icons/SubscriptionsLogo.svelte';
	import WeeklySvg from './icons/WeeklyLogo.svelte';

	export let tone: Tone;

	const toneLogoMapping: Record<Tone, ComponentType> = {
		job: JobsSvg,
		live: LiveSvg,
		travel: TravelSvg,
		money: MoneySvg,
		book: BookSvg,
		weekly: WeeklySvg,
		members: MembersSvg,
		patron: PatronSvg,
		brand: BrandSvg,
		'brand-new': BrandSvg,
		lifestyle: GenericSvg,
		climate: GenericSvg,
		climate2: GenericSvg,
		support: GenericSvg,
		subscription: SubscriptionSvg,
		'subs-rebrand': SubscriptionSvg,
	} as const;
</script>

<div style:color="#fff">
	{#if toneLogoMapping[tone]}
		<svelte:component this={toneLogoMapping[tone]} />
	{:else}
		<svelte:component this={BrandSvg} />
	{/if}
</div>
