<script lang="ts">
	export let tone: string;
	import JobsSvg from './icons/JobsLogo.svelte';
	import LiveSvg from './icons/LiveLogo.svelte';
	import TravelSvg from './icons/HolidaysLogo.svelte';
	import MoneySvg from './icons/MoneydealsLogo.svelte';
	import BookSvg from './icons/BookshopLogo.svelte';
	import MasterclassSvg from './icons/MasterclassesLogo.svelte';
	import WeeklySvg from './icons/WeeklyLogo.svelte';
	import MembersSvg from './icons/MembersLogo.svelte';
	import PatronSvg from './icons/PatronLogo.svelte';
	import BrandSvg from './icons/BrandLogo.svelte';
	import GenericSvg from './icons/GenericLogo.svelte';
	import SubscriptionSvg from './icons/SubscriptionsLogo.svelte';

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
		lifestyle: GenericSvg,
		climate: GenericSvg,
		climate2: GenericSvg,
		support: GenericSvg,
		subscription: SubscriptionSvg,
		'subs-rebrand': SubscriptionSvg,
	};
</script>

{#if toneLogoMapping[tone]}
	<svelte:component this={toneLogoMapping[tone]} />
{:else}
	<svelte:component this={BrandSvg} />
{/if}
