<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
    import type { GAMVariable } from '$lib/gam';
	import { CLICK_MACRO } from '$lib/gam';

</script>

<!-- 
{{#advertisementLabel}}{{/advertisementLabel}} -->
<div class="creative creative--fabric">
    <a id="linkDesktop" class="blink gs-container creative__link hide-until-tablet"
        href="%%CLICK_URL_UNESC%%%%DEST_URL%%">
        <div class="u-root">
            <div class="creative__alt creative__alt--tablet">
                <div class="creative__layer creative__layer1">
                    <picture>
                        <source style="object-position: [%Layer1BackgroundPosition%];" srcset="[%Layer1BackgroundImage%]">
                        <img style="object-position: [%Layer1BackgroundPosition%];" src="[%Layer1BackgroundImage%]" alt="">
                    </picture>
                </div>
                <div id="layer2" class="creative__layer creative__layer2 creative__layer2--animation-[%Layer2BackgroundAnimation%] creative__layer2--animation-pos-[%Layer2BackgroundAnimationPosition%]">
                    <picture >
                        <source srcset="[%Layer2BackgroundImage%]">
                    </picture>

                </div>
                <div class="creative__layer creative__layer3">
                    <picture>
                        <source srcset="[%Layer3BackgroundImage%]">
                    </picture>
                </div>
            </div>
        </div>
    </a>
    <a id="linkMobile" class="blink gs-container creative__link mobile-only"
        href="%%CLICK_URL_UNESC%%%%DEST_URL%%">
        <div class="u-root">
            <div class="creative__alt creative__alt--mobile">
                <div class="creative__layer creative__layer1"
                    style="background-image: url('[%MobileLayer1BackgroundImage%]');
                        background-position: [%MobileLayer1BackgroundPosition%]"
                    ></div>
                <div class="creative__layer creative__layer2"
                    style="background-image: url('[%MobileLayer2BackgroundImage%]');
                        background-position: [%MobileLayer2BackgroundPosition%]"
                    ></div>
                <div class="creative__layer creative__layer3"
                    style="background-image: url('[%MobileLayer3BackgroundImage%]');
                        background-position: [%MobileLayer3BackgroundPosition%]"
                    ></div>
            </div>
        </div>
    </a>

    <img src="[%Trackingpixel%]" class="creative__pixel">
    <img src="[%Researchpixel%]" class="creative__pixel">
    <img src="[%Viewabilitypixel%]" class="creative__pixel">
</div>
[%thirdPartyJSTracking%]




<style lang="scss">

// @import '_core';

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

}


</style>
