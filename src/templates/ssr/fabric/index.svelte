<script lang="ts">
    import type { GAMVariable } from "../../../lib/gam";
    import AdvertismentLabel from "$templates/components/AdvertismentLabel.svelte";
    import ThirdPartyTracking from "$templates/components/ThirdPartyTracking.svelte";
    import Pixel from "$templates/components/Pixel.svelte";

    export let Layer1BackgroundImage: GAMVariable;
    export let Layer2BackgroundImage: GAMVariable;
    export let Layer3BackgroundImage: GAMVariable;

    export let MobileLayer1BackgroundImage: GAMVariable;
    export let MobileLayer2BackgroundImage: GAMVariable;
    export let MobileLayer3BackgroundImage: GAMVariable;

    export let Layer1BackgroundPosition: GAMVariable;
    export let Layer2BackgroundPosition: GAMVariable;
    export let Layer3BackgroundPosition: GAMVariable;

    export let MobileLayer1BackgroundPosition: GAMVariable;
    export let MobileLayer2BackgroundPosition: GAMVariable;
    export let MobileLayer3BackgroundPosition: GAMVariable;

    export let Trackingpixel: GAMVariable;
    export let Researchpixel: GAMVariable;
    export let Viewabilitypixel: GAMVariable;

    export let thirdPartyJSTracking: GAMVariable;

</script>

<AdvertismentLabel />
<div class="creative creative--fabric">
    <!--desktop-->
    <a id="linkDesktop" class="blink gs-container creative__link until-tablet"
        href="%%CLICK_URL_UNESC%%%%DEST_URL%%">
        <div class="u-root">
            <div class="creative__alt creative__alt--tablet">
                <div class="creative__layer creative__layer1" style={`background-image: url(${Layer1BackgroundImage}); background-position: ${Layer1BackgroundPosition};`}></div>
                <div id="layer2" class="creative__layer creative__layer2" 
                style={`background-image: url(${Layer2BackgroundImage}); background-position: ${Layer2BackgroundPosition};`} >
                    </div>
                <div class="creative__layer creative__layer3"
                style={`background-image: url(${Layer3BackgroundImage}); background-position: ${Layer3BackgroundPosition};`}
                    ></div>
            </div>
        </div>
    </a>

    <!--mobile-->
    <a id="linkMobile" class="blink gs-container creative__link mobile-only"
    href="%%CLICK_URL_UNESC%%%%DEST_URL%%">
        <div class="u-root">
            <div class="creative__alt creative__alt--mobile">
                <div class="creative__layer creative__layer1"
            style={`background-image: url(${MobileLayer1BackgroundImage}); background-position: ${MobileLayer1BackgroundPosition};`}
                ></div>
            <div class="creative__layer creative__layer2"
                style={`background-image: url(${MobileLayer2BackgroundImage}); background-position: ${MobileLayer2BackgroundPosition};`}
                ></div>
            <div class="creative__layer creative__layer3"
            style={`background-image: url(${MobileLayer3BackgroundImage}); background-position: ${MobileLayer3BackgroundPosition};`}
            ></div>
        </div>
    </div>
    </a>
    <Pixel src={Trackingpixel} />
    <Pixel src={Researchpixel} />
    <Pixel src={Viewabilitypixel} />
</div>
<ThirdPartyTracking
TrackingScript={thirdPartyJSTracking}
/>



<style lang="scss">

.u-root {
    position: relative;
}

.gs-container {
    position: relative;

    @media (min-width: 46.25em) {
        padding: 0 calc(50% - 370px);
    }

    @media (min-width: 61.25em) {
        padding: 0 calc(50% - 490px);
    }

    @media (min-width: 71.25em) {
        padding: 0 calc(50% - 570px);
    }


    @media (min-width: 81.25em) {
        padding: 0 calc(50% - 650px);
    }
}

.creative.creative--fabric {
    display: block;
    position: relative
}

.creative--fabric {
    &, .creative__link {
        height: 250px;
        overflow: hidden;
    }
}

.creative__layer1 { z-index: 1; }
.creative__layer2 { z-index: 2; }
.creative__layer3 { z-index: 3; }

.creative__alt, .creative__layer {
        width: 100%;
        height: 250px;
        position: absolute;
        inset: 0;
        background-repeat: no-repeat;
        background-size: cover;
}

.blink {
    display: block;
    text-decoration: none;
}

.mobile-only {
    display: none;
}

@media (max-width: 740px) {
    .until-tablet {
        display: none;
    }

    .mobile-only {
        display: block;
    }
}

</style>