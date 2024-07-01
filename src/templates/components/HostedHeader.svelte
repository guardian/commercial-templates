<script lang="ts">
	import '$templates/components/fonts/SansBold.css';

	export let logo: string | null;
</script>

<header>
	<h1>From our advertisers</h1>
	{#if logo}
		<div class="logo">
			<div>Advertiser content</div>
			<img src={logo} alt="advertiser logo" />
		</div>
	{/if}
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	h1 {
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1;
		margin: 6px 0 0;
	}

	.logo {
		display: flex;
		flex-direction: column;
		background-color: var(--neutral-100);
		width: 5em;

		div {
			padding: 0.5em;
			font-size: 0.75rem;
			line-height: 1.1;
			background-color: var(--brand-colour);
			color: var(--neutral-100);
			text-align: start;
		}

		img {
			width: 100%;
		}
	}

	@media (min-width: 1140px) {
		header {
			flex-direction: column;
		}

		.logo {
			width: 7em;

			div {
				padding: 6px 0 8px;
				text-align: center;
			}
		}
	}
</style>
