<script lang="ts">
	import { clickMacro } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import Button from './Button.svelte';
	import ArrowDown from './icons/ArrowDown.svelte';
	import '$templates/components/fonts/SansBold.css';
	import GuardianLabsLogo from './icons/GuardianLabsCircleLogo.svelte';

	interface Props {
		SeriesUrl: string;
		ComponentTitle: string;
		edition: Single['branding']['edition'];
		popup?: boolean;
	}

	let {
		SeriesUrl,
		ComponentTitle,
		edition,
		popup = $bindable(false),
	}: Props = $props();
</script>

<header class="header">
	<div class="logo">
		<GuardianLabsLogo {edition} />
	</div>
	<div class="paid-info-and-title">
		<div class="paid-info">
			<strong class="paid-info--label">Paid content</strong>
			<div class="popup-container">
				<Button onclick={() => (popup = !popup)}
					>About <ArrowDown width={14} flip={popup} /></Button
				>
				{#if popup}
					<div id="popup" class="popup">
						<p class="popup-text">
							Paid content is paid for and controlled by an advertiser and
							produced by the Guardian Labs team
						</p>
						<a
							class="popup-link"
							href={clickMacro('https://theguardian.com/content-funding')}
							target="_top">Learn more about Guardian Labs content &rarr;</a
						>
					</div>
				{/if}
			</div>
		</div>

		<a
			href={clickMacro(`https://theguardian.com/${SeriesUrl}`)}
			target="_top"
			rel="external"
		>
			<h2 class="title">
				{ComponentTitle}
			</h2>
		</a>
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

		@media (min-width: 1140px) {
			padding: 12px;
		}
	}

	.logo {
		padding: 6px;
		border-right: 1px solid var(--neutral-86);

		@media (min-width: 1140px) {
			border-right: none;
			padding-left: 0;
		}
	}

	.paid-info-and-title {
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 4px;
		flex: 1;

		@media (min-width: 740px) {
			gap: 16px;
		}

		@media (min-width: 980px) {
			gap: 4px;
		}

		@media (min-width: 1140px) {
			padding-left: 0;
			justify-content: unset;
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

			@media (min-width: 1140px) {
				flex-direction: column;
				gap: 8px;
			}
			@media (min-width: 1300px) {
				flex-direction: row;
			}
		}

		a {
			color: inherit;
			text-decoration: none;

			&:hover .title {
				color: inherit;
				text-decoration: underline;
			}
		}

		.title {
			margin: 0;
			font-size: 1.25rem;
			font-family: 'GuardianTextSans';
			font-weight: 700;
		}
	}

	.popup-container {
		position: relative;
	}

	.popup {
		position: absolute;
		color: var(--neutral-7);
		width: 260px;
		background: var(--neutral-93);
		font-size: 14px;
		line-height: 16px;
		padding: 12px;
		border-radius: 4px;
		box-sizing: border-box;
		font-weight: normal;
		right: 0;
		z-index: 1;

		.popup-text {
			margin-top: 0;
		}

		.popup-link {
			color: var(--labs-200);
			text-decoration: none;

			&:hover,
			&:focus {
				text-decoration: underline;
			}
		}

		@media (min-width: 1140px) {
			left: 0;
		}
	}
</style>
