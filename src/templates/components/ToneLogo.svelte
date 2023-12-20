<script lang="ts">
	export let tone: string;
	import JobsSvg from './icons/guardian-jobs-logo.svelte';
	import LiveSvg from './icons/guardian-live-logo.svelte';
	import TravelSvg from './icons/guardian-holidays-logo.svelte';
	import MoneySvg from './icons/guardian-moneydeals-logo.svelte';
	import BookSvg from './icons/guardian-bookshop-logo.svelte';
	import MasterclassSvg from './icons/guardian-masterclasses-logo.svelte';
	import WeeklySvg from './icons/guardian-weekly-logo.svelte';
	import MembersSvg from './icons/guardian-members-logo.svelte';
	import PatronSvg from './icons/guardian-patron-logo.svelte';
	import BrandSvg from './icons/guardian-generic-logo.svelte';
	import LifestyleSvg from './icons/guardian-generic-logo.svelte';
	import ClimateSvg from './icons/guardian-generic-logo.svelte';
	import Climate2Svg from './icons/guardian-generic-logo.svelte';
	import SupportSvg from './icons/guardian-generic-logo.svelte';
	import SubscriptionSvg from './icons/guardian-subscriptions-logo.svelte';

	const toneLogoMapping = {
		job: JobsSvg,
		live: LiveSvg,
		travel: TravelSvg,
		money: MoneySvg,
		book: BookSvg,
		masterclass: MasterclassSvg,
		weekly: WeeklySvg,
		members: MembersSvg,
		patron: PatronSvg,
		brand: BrandSvg,
		lifestyle: LifestyleSvg,
		climate: ClimateSvg,
		climate2: Climate2Svg,
		support: SupportSvg,
		subscription: SubscriptionSvg,
		'subs-rebrand': SubscriptionSvg,
	};
</script>

{#if toneLogoMapping[tone]}
	<svelte:component this={toneLogoMapping[tone]} />
{:else}
	<svelte:component this={BrandSvg} />
{/if}
