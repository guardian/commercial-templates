<script context="module">
	const ESC = '%%CLICK_URL_UNESC%%';
</script>

<script>
	import GuardianLabs from './icons/GuardianLabs.svelte';

	export let SeriesUrl;
	export let ComponentTitle;

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

<style>
	header {
		background-color: #69d1ca;
		color: black;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.paid {
		position: relative;
	}

	h1 {
		color: white;
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
		background: #333333;
		font-size: 14px;
		line-height: 16px;
		padding: 10px;
		border-radius: 4px;
		box-sizing: border-box;
		font-weight: normal;
		right: auto;
	}

	#popup p {
		margin-top: 0;
	}

	.popup-link {
		color: #69d1ca;
		text-decoration: none;
	}

	.popup-link:hover,
	.popup-link:focus {
		text-decoration: underline;
	}

	@media (min-width: 1140px) {
		header {
			flex-direction: column;
			width: 171px;
		}
	}

	@media (min-width: 1300px) {
		header {
			width: 251px;
		}
	}
</style>
