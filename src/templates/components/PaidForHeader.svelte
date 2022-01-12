<script context="module" lang="ts">
	const ESC = '%%CLICK_URL_UNESC%%';
</script>

<script lang="ts">
	import type { Prop } from '$lib/svelte';

	import GuardianLabs from './icons/GuardianLabs.svelte';

	export let SeriesUrl: Prop;
	export let ComponentTitle: Prop;

	export let popup = false;
</script>

<header>
	<div class="paid">
		Paid content
		<button
			aria-controls="popup"
			aria-expanded="true"
			on:click={() => (popup = !popup)}>About &darr;</button
		>
		{#if popup}
			<div id="popup">
				<p>
					Paid content is paid for and controlled by an advertiser and
					produced by the Guardian Labs team
				</p>
				<a
					class="popup-link"
					href={`${ESC}https://theguardian.com/content-funding`}
					target="_top"
					>Learn more about Guardian Labs content &rarr;</a
				>
			</div>
		{/if}
	</div>

	<h1 class="adverts__title">
		<a href={`${ESC}https://theguardian.com/${SeriesUrl}`} target="_top">
			{ComponentTitle}
		</a>
	</h1>

	<div class="logo">
		<GuardianLabs />
	</div>
</header>

<style lang="scss">
	header {
		--green: #69d1ca
		background-color: var(--green);
		color: black;
		padding: 6px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.paid {
		position: relative;
	}

	.paid button {
		display: inline-block;
	}

	h1 {
		color: white;
		margin: 0;
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

	@media (min-width: 1140px) {
		header {
			padding: 20px;
			width: 171px;
		}
	}

	@media (min-width: 1300px) {
		header {
			width: 251px;
		}
	}
</style>
