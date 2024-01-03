<script context="module" lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
</script>

<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import Button from './Button.svelte';
	import ArrowDown from './icons/ArrowDown.svelte';
	import '$templates/components/fonts/SansBold.css';

	import GuardianLabs from './icons/GuardianLabs.svelte';

	export let SeriesUrl: GAMVariable;
	export let ComponentTitle: GAMVariable;
	export let edition: Single['branding']['edition'];
	export let templateType = '';

	export let popup = false;
</script>

<header>
	<div class="paid {templateType === 'multiple' && 'multiple-header'}">
		<strong>Paid content</strong>
		<Button
			aria-controls="popup"
			aria-expanded="true"
			on:click={() => (popup = !popup)}
			>About <ArrowDown width={12} flip={popup} /></Button
		>
		{#if popup}
			<div id="popup">
				<p>
					Paid content is paid for and controlled by an advertiser and produced
					by the Guardian Labs team
				</p>
				<a
					class="popup-link"
					href={`${CLICK_MACRO}https://theguardian.com/content-funding`}
					target="_top">Learn more about Guardian Labs content &rarr;</a
				>
			</div>
		{/if}
	</div>

	<h1 class="adverts__title {templateType === 'multiple' && 'multiple-title'}">
		<a
			href={`${CLICK_MACRO}https://theguardian.com/${SeriesUrl}`}
			target="_top"
		>
			{ComponentTitle}
		</a>
	</h1>

	<div class="logo {templateType === 'multiple' && 'multiple-logo'}">
		<GuardianLabs {edition} />
	</div>
</header>

<style lang="scss">
	header {
		--green: #69d1ca;
		background-color: var(--green);
		color: black;
		padding: 6px 10px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.multiple-header {
		flex-direction: row;
	}
	.paid {
		position: relative;
		font-size: 13px;

		strong {
			padding-right: 0.5em;
		}
	}

	h1 {
		color: white;
		margin: 0;
	}

	.multiple-title {
		font-size: 18px;
		line-height: 24px;
	}

	.logo {
		align-self: flex-end;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	#popup {
		position: absolute;
		color: white;
		width: 260px;
		background: #333;
		font-size: 14px;
		line-height: 16px;
		padding: 10px;
		border-radius: 4px;
		box-sizing: border-box;
		font-weight: normal;
		right: auto;

		p {
			margin-top: 0;
		}
	}

	.popup-link {
		color: var(--green);
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	@media (max-width: 739px) {
		.multiple-header {
			align-self: flex-start;
		}

		h1 {
			align-self: flex-start;
		}
	}

	@media (min-width: 980px) {
		.multiple-header {
			flex-direction: column;
		}
	}

	@media (min-width: 1140px) {
		header {
			padding: 12px 20px;
			width: 171px;
		}

		.multiple-header {
			align-self: flex-start;
			justify-content: flex-start;
		}

		.multiple-title {
			margin-top: 10px;
			align-self: flex-start;
		}

		.multiple-logo {
			margin-top: auto;
		}
	}

	@media (min-width: 1300px) {
		header {
			width: 251px;
		}
	}
</style>
