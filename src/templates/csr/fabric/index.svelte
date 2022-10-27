<script lang="ts">
	import AdvertismentLabel from '$templates/components/AdvertismentLabel.svelte';
	import { CLICK_MACRO, DEST_URL, gamVar } from '../../../lib/gam';
	import Pixel from '../../components/Pixel.svelte';
	import ThirdPartyScript from '../../components/ThirdPartyScript.svelte';

	let innerWidth: number;
	$: backgroundPosition = innerWidth <= 480 ? '40% center' : 'center center';
</script>

<svelte:window bind:innerWidth />

<AdvertismentLabel />
<base target="_blank" />
<div class="creative creative--fabric">
	<a class="blink gs-container creative__link" href={CLICK_MACRO + DEST_URL}>
		<div class="creative__alt">
			<div
				class="creative__layer creative__layer1"
				style={[
					`--position: ${backgroundPosition}`,
					`--image: url([%Layer1BackgroundImage%])`,
				].join(';')}
			/>
			<div
				id="layer2"
				class={`creative__layer creative__layer2 creative__layer2--animation-[%Layer2BackgroundAnimation%] creative__layer2--animation-pos-${gamVar(
					'Layer2BackgroundAnimationPosition',
				)}`}
				style={[
					`--position: ${backgroundPosition}`,
					`--image: ${gamVar('Layer2BackgroundImage')}`,
				].join(';')}
			/>
		</div>
	</a>

	<Pixel src={gamVar('Trackingpixel')} />
	<Pixel src={gamVar('Researchpixel')} />
	<Pixel src={gamVar('Viewabilitypixel')} />
</div>
<ThirdPartyScript />

<style lang="scss">
	@import './src/_shared/scss/core';

	.creative--fabric {
		&,
		.creative__link {
			height: 250px;
			overflow: hidden;
		}
		.is-parallax {
			&.gs-container {
				padding: 0 calc(50% - 650px);
			}
		}

		.creative__layer1 {
			z-index: 1;
		}
		.creative__layer2 {
			z-index: 2;
		}
		.creative__layer3 {
			z-index: 3;
		}

		.creative__background,
		.creative__alt,
		.creative__layer {
			width: 100%;
			height: 250px;
			position: absolute;
			top: 0;
			left: 0;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: var(--position);
			background-image: var(--image);
		}

		.creative__background {
			background-position: center;
		}
	}
</style>
