<script context="module" lang="ts">
	import { CLICK_MACRO } from '$lib/gam';
</script>

<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import type { Single } from '$lib/types/capi';
	import Button from './Button.svelte';
	import ArrowRight from './icons/ArrowRight.svelte';
	import '$templates/components/fonts/EgyptianWeb.css';
	import '$templates/components/fonts/SansBold.css';

	import LiveLogo from './icons/LiveLogo.svelte';

	export let BrowseAllUrl: GAMVariable;
	export let BannerDescription: GAMVariable;
	export let HeaderButtonText: GAMVariable;
</script>

<header>
	<div class="logo">
		<LiveLogo />
	</div>

	<div class="adverts_blurb">
        <span class="adverts__blurb">{BannerDescription}</span>
    </div>

	<div class="button-container">
		<a
			class="hide-until-mobile-landscape button"
			href={`${CLICK_MACRO}${BrowseAllUrl}`}
			target="_top"
		>
			{HeaderButtonText}
			<ArrowRight width={30} />
		</a>
	</div>
</header>

<style lang="scss">
	header {
		--pink: #c83877;
		background-color: var(--pink);
		color: black;
		padding: 6px 20px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		align-self: flex-start;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.adverts__blurb {
		font-size: 16px;
		line-height: 22px;
		font-family: 'Guardian Egyptian Web', 'Georgia', serif;
        color: #000000;
        background: #ffffff;
        box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
        padding: 2px 5px 2px 2px;

        @media (max-width: 1140px) {
            display: none;
        }
    }

    div.adverts_blurb {
      margin-top: 20px;
      margin-bottom: 20px;
    }

	.button-container {
		display: flex;
		display: -webkit-flex;
		-webkit-box-direction: normal;
		-webkit-box-orient: vertical;
	}

	a.button {
		font-size: 13px;
		font-weight: 700;
		font-family: 'GuardianTextSans', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		background: #ffffff;
    	color: #000000;
		text-decoration: none;
		border-radius: 10rem;
		padding: 3px;
		padding-left: 1rem;
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: space-between;
		-webkit-box-align: center;
		align-items: center;
	}

	@media (min-width: 1140px) {
		header {
			padding: 12px 20px;
			width: 171px;
			flex-direction: column;
		}

		.button-container {
			flex-direction: column;
			-webkit-flex-direction: column;
			width: 100%;
		}
	}

	@media (min-width: 1300px) {
		header {
			width: 251px;
		}
	}
</style>
