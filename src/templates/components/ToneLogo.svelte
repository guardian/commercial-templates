<script lang="ts">
	export let tone: string;

	const toneLogoMapping = {
		job: 'guardian-jobs-logo',
		live: 'guardian-live-logo',
		travel: 'guardian-holidays-logo',
		money: 'guardian-moneydeals-logo',
		book: 'guardian-bookshop-logo',
		masterclass: 'guardian-masterclasses-logo',
		weekly: 'guardian-weekly-logo',
		members: 'guardian-members-logo',
		patron: 'guardian-patron-logo',
		brand: 'guardian-generic-logo',
		lifestyle: 'guardian-generic-logo',
		climate: 'guardian-generic-logo',
		climate2: 'guardian-generic-logo',
		support: 'guardian-generic-logo',
		subscription: 'guardian-subscriptions-logo',
		'subs-rebrand': 'guardian-subscriptions-logo',
	};

	const SVG = await import(
		`$templates/components/icons/${toneLogoMapping[tone]}.svg`
	);
</script>

<svelte:component this={`${toneLogoMapping[tone]}?component`} />
```
