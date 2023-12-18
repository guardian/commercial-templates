<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
	import type { GAMVariable } from '$lib/gam';
	import { addPixel, isValidReplacedVariable } from '$lib/gam';

	export let Trackingpixel: GAMVariable;
	export let Researchpixel: GAMVariable;
	export let Viewabilitypixel: GAMVariable;
	export let ClickthroughUrl: GAMVariable;
	export let thirdPartyJSTracking: GAMVariable;
	export let BackgroundScrollType: GAMVariable;
	export let BackgroundColour: GAMVariable;
	export let BackgroundImage: GAMVariable;
	export let BackgroundImagePosition: GAMVariable;
	export let BackgroundImageRepeat: GAMVariable;
	export let Layer1BackgroundImage: GAMVariable;
	export let Layer1BackgroundPosition: GAMVariable;
	export let Layer2BackgroundImage: GAMVariable;
	export let Layer2BackgroundPosition: GAMVariable;
	export let Layer2BackgroundAnimation: GAMVariable;
	export let Layer2BackgroundAnimationPosition: GAMVariable;
	export let Layer3BackgroundImage: GAMVariable;
	export let Layer3BackgroundPosition: GAMVariable;
	export let MobileBackgroundImage: GAMVariable;
	export let MobileBackgroundImagePosition: GAMVariable;
	export let MobileBackgroundImageRepeat: GAMVariable;
	export let MobileLayer1BackgroundImage: GAMVariable;
	export let MobileLayer1BackgroundPosition: GAMVariable;
	export let MobileLayer2BackgroundImage: GAMVariable;
	export let MobileLayer2BackgroundPosition: GAMVariable;
	export let MobileLayer3BackgroundImage: GAMVariable;
	export let MobileLayer3BackgroundPosition: GAMVariable;

	if (isValidReplacedVariable(Trackingpixel)) addPixel(Trackingpixel);
	if (isValidReplacedVariable(Researchpixel)) addPixel(Researchpixel);
	if (isValidReplacedVariable(Viewabilitypixel)) addPixel(Viewabilitypixel);

</script>

<div class="gs-container creative__label creative__label">
	<div class="creative__label-text">
		Advertisement
	</div>
</div>
<div class="creative creative--fabric">
    <a id="linkDesktop" class="blink gs-container creative__link hide-until-tablet"
        href="%%CLICK_URL_UNESC%%%%DEST_URL%%">
        <div class="u-root">
            <div class="creative__alt creative__alt--tablet">
                <div class="creative__layer creative__layer1"
                    style="background-image: url('{Layer1BackgroundImage}');
                        background-position: {Layer1BackgroundPosition}"
                    ></div>
                <div id="layer2" class="creative__layer creative__layer2 creative__layer2--animation-{Layer2BackgroundAnimation} creative__layer2--animation-pos-{Layer2BackgroundAnimationPosition}"
                    style="background-image: url('{Layer2BackgroundImage}');background-position: {Layer2BackgroundPosition}"
                    ></div>
                <div class="creative__layer creative__layer3"
                    style="background-image: url('{Layer3BackgroundImage}');
                        background-position: {Layer3BackgroundPosition}"
                    ></div>
            </div>
        </div>
    </a>
    <a id="linkMobile" class="blink gs-container creative__link mobile-only"
        href="%%CLICK_URL_UNESC%%%%DEST_URL%%">
        <div class="u-root">
            <div class="creative__alt creative__alt--mobile">
                <div class="creative__layer creative__layer1"
                    style="background-image: url('{MobileLayer1BackgroundImage}');
                        background-position: {MobileLayer1BackgroundPosition}"
                    ></div>
                <div class="creative__layer creative__layer2"
                    style="background-image: url('{MobileLayer2BackgroundImage}');
                        background-position: {MobileLayer2BackgroundPosition}"
                    ></div>
                <div class="creative__layer creative__layer3"
                    style="background-image: url('{MobileLayer3BackgroundImage}');
                        background-position: {MobileLayer3BackgroundPosition}"
                    ></div>
            </div>
        </div>
    </a>
</div>
{thirdPartyJSTracking}

<style lang="scss">
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

    .creative__layer1 { z-index: 1; }
    .creative__layer2 { z-index: 2; }
    .creative__layer3 { z-index: 3; }

    .creative__background,
    .creative__alt,
    .creative__layer {
        width: 100%;
        height: 250px;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
    }

    .creative__background {
        background-position: center;
    }

    .creative__layer2--animation-enabled {
        animation-duration: 1.4s;
        animation-delay: .4s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
        animation-play-state: paused;

        &.creative__layer2--animation-pos-left   { animation-name: textanimation-left; background-position: left -250px; }
        &.creative__layer2--animation-pos-centre { animation-name: textanimation-centre; background-position: center -250px; }
        &.creative__layer2--animation-pos-right  { animation-name: textanimation-right; background-position: right -250px; }

        &.is-animating {
            animation-play-state: running;
        }
    }
}

@keyframes textanimation-left {
    0%   { background-position: 0 -250px; }
    75%  { background-position: 0 0; }
    100% { background-position: 0 0; }
}

@keyframes textanimation-right {
    0%   { background-position: right -250px; }
    75%  { background-position: right 0; }
    100% { background-position: right 0; }
}

@keyframes textanimation-centre {
    0%   { background-position: center -250px; }
    75%  { background-position: center 0; }
    100% { background-position: center 0; }
}

</style>
