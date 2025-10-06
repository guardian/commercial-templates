<script lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import Button from './Button.svelte';
	import ArrowDown from './icons/ArrowDown.svelte';
	import '$templates/components/fonts/SansBold.css';
	import GuardianLabsRedesign from './icons/GuardianLabsCircleLogo.svelte';

	export let SeriesUrl: string;
	export let ComponentTitle: string;
	export let edition: Single['branding']['edition'];
	export let templateType: 'single' | 'multiple';

	export let popup = false;
</script>

<header class="header">
	<div class="logo">
		<GuardianLabsRedesign {edition} />
	</div>
	<div class="paid-info-and-title">
		<div class="paid-info">
			<strong class="paid-info--label">Paid content</strong>
			<Button on:click={() => (popup = !popup)}
				>About <ArrowDown width={12} flip={popup} /></Button
			>
			{#if popup}
				<div id="popup" class="popup">
					<p class="popup-text">
						Paid content is paid for and controlled by an advertiser and
						produced by the Guardian Labs team
					</p>
					<a
						class="popup-link"
						href={`${CLICK_MACRO}https://theguardian.com/content-funding`}
						target="_top">Learn more about Guardian Labs content &rarr;</a
					>
				</div>
			{/if}
		</div>

		<h1 class="title" class:multiple-title={templateType === 'multiple'}>
			<a
				href={`${CLICK_MACRO}https://theguardian.com/${SeriesUrl}`}
				target="_top"
			>
				{ComponentTitle}
			</a>
		</h1>
	</div>
</header>

<style lang="scss">
	.header {
		background-color: var(--labs-700);
		color: black;
		padding: 6px 10px;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		@media (min-width: 740px) {
			gap: 8px;
		}

		@media (min-width: 980px) {
			gap: 0;
		}

		@media (min-width: 1140px) {
			flex-direction: column;
			padding: 12px 20px;
		}

		@media (min-width: 1300px) {
			/* TODO: Amend padding after setting up widths via grid/etc in template components */
			padding: 0 !important;
		}
	}

	.logo {
		padding: 6px;
		border-right: 1px solid var(--neutral-73);
		align-self: flex-start;

		@media (min-width: 1300px) {
			border-right: none;
		}
	}

	.paid-info-and-title {
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;

		@media (min-width: 740px) {
			gap: 16px;
		}

		@media (min-width: 980px) {
			gap: 4px;
		}

		.paid-info {
			display: flex;
			justify-content: space-between;
			position: relative;
			font-size: 14px;
			width: 100%;

			.paid-info--label {
				color: var(--labs-100);
				padding-right: 0.5em;
			}

			button {
				color: black;
			}
		}

		.title {
			margin: 0;
			font-size: 16px;
			font-family: 'GuardianTextSans';
			font-weight: 700;

			a {
				color: inherit;
				text-decoration: none;
			}
		}
	}

	.popup {
		position: absolute;
		color: white;
		width: 260px;
		background: var(--neutral-20);
		font-size: 14px;
		line-height: 16px;
		padding: 10px;
		border-radius: 4px;
		box-sizing: border-box;
		font-weight: normal;
		right: auto;
		z-index: 1;

		.popup-text {
			margin-top: 0;
		}

		.popup-link {
			color: var(--labs-400);
			text-decoration: none;

			&:hover,
			&:focus {
				text-decoration: underline;
			}
		}
	}
</style>
