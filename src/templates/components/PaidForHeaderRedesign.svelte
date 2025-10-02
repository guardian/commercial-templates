<script lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import Button from './Button.svelte';
	import ArrowDown from './icons/ArrowDown.svelte';
	import '$templates/components/fonts/SansBold.css';
	import GuardianLabsRedesign from './icons/GuardianLabsRedesign.svelte';

	export let SeriesUrl: string;
	export let ComponentTitle: string;
	export let edition: Single['branding']['edition'];
	export let templateType: 'single' | 'multiple';

	export let popup = false;
</script>

<header class="{templateType}-header">
	<div class="logo {templateType}-logo">
		<GuardianLabsRedesign {edition} />
	</div>
	<div class="{templateType}-paid-content-and-title">
		<div class="paid {templateType}-paid-content">
			<strong>Paid content</strong>
			<Button on:click={() => (popup = !popup)}
				>About <ArrowDown width={12} flip={popup} /></Button
			>
			{#if popup}
				<div id="popup">
					<p>
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

		<h1
			class="adverts__title"
			class:multiple-title={templateType === 'multiple'}
		>
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
	header {
		background-color: var(--labs-700);
		color: black;
		padding: 6px 10px;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		@media (min-width: 1140px) {
			flex-direction: column;
			padding: 12px 20px;
		}

		@media (min-width: 1300px) {
			/* TODO: Amend padding after setting up widths via grid/etc in template components */
			padding: 0 !important;
		}
	}

	h1 {
		margin: 0;
		font-size: 16px;
		font-family: 'GuardianTextSans';
		font-weight: 700;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.logo {
		padding: 6px;
		border-right: 1px solid var(--neutral-73);
		align-self: flex-start;

		@media (min-width: 1300px) {
			border-right: none;
		}
	}

	.paid {
		display: flex;
		justify-content: space-between;
		position: relative;
		font-size: 14px;
		width: 100%;

		strong {
			color: var(--labs-100);
			padding-right: 0.5em;
		}

		button {
			color: black;
		}
	}

	.single-header {
		align-items: start;

		@media (min-width: 740px) {
			gap: 8px;
		}

		@media (min-width: 980px) {
			gap: 0;
		}
	}

	.single-paid-content-and-title {
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		gap: 4px;

		@media (min-width: 740px) {
			flex: 1;
			gap: 16px;
		}

		@media (min-width: 980px) {
			gap: 4px;
		}
	}

	.multiple-header {
		flex-direction: row;
		align-content: space-between;
	}

	.multiple-paid-content-and-title {
		display: flex;
		flex-direction: column;
	}

	.multiple-paid-content {
		flex-direction: row;
	}

	.multiple-title {
		font-size: 18px;
		line-height: 24px;
	}

	#popup {
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

		p {
			margin-top: 0;
		}
	}

	.popup-link {
		color: var(--labs-400);
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	@media (min-width: 740px) {
		.multiple-paid-content-and-title {
			flex-direction: inherit;
			align-items: center;

			.multiple-paid-content {
				padding: 0 20px;
			}

			.multiple-title {
				padding: 5px 0 7px 0;
			}
		}
	}

	@media (min-width: 980px) {
		.multiple-header {
			flex-direction: column;
		}
		.multiple-paid-content {
			flex-direction: column;
		}
	}

	@media (min-width: 1140px) {
		header {
			padding: 12px 20px;
			width: 151px;
		}

		.multiple-paid-content-and-title {
			align-self: flex-start;
			align-items: flex-start;

			.multiple-paid-content {
				padding: 0;
			}
		}

		.multiple-logo {
			margin-top: auto;
		}
	}
</style>
