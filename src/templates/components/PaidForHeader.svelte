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
				href={`${ESC}https://theguardian.com/content-funding`}
				target="_top">Learn more about Guardian Labs content &rarr;</a
			>
		</div>
	{/if}
	<h1 class="adverts__title">
		<a href={`${ESC}https://theguardian.com/${SeriesUrl}`} target="_top">
			{ComponentTitle}
		</a>
	</h1>

	<GuardianLabs />
</header>

<style>
	header {
		background-color: #69d1ca;
		color: black;
	}
	h1 {
		color: white;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	#popup {
		position: absolute;
		color: white;
		width: 200px;
		background-color: #000c;
	}
</style>
