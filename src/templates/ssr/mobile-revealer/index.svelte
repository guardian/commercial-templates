<script lang="ts">
   import { type GAMVariable } from '$lib/gam';

	export let thirdPartyJSTracking: GAMVariable;

</script>

<div class="creative creative--revealer">
    <a class="creative__cta" href="%%CLICK_URL_UNESC%%%%DEST_URL_ESC%%" target="_blank">
         <!-- svelte-ignore a11y-missing-attribute -->
        <img class="creative__button creative__button--[%Buttonverticalposition%] creative__button--[%Buttonhorizontalposition%]" src="[%Button%]" >
    </a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img 
        src="[%Trackingpixel%]%%CACHEBUSTER%%" 
        class="creative__pixel"
        aria-hidden="true"
    />
     <!-- svelte-ignore a11y-missing-attribute -->
    <img
        src="[%Researchpixel%]%%CACHEBUSTER%%" 
        class="creative__pixel"
        aria-hidden="true"
    >
    <!-- svelte-ignore a11y-missing-attribute -->
    <img 
        src="[%Viewabilitytracker%]"
        class="creative__pixel"
        aria-hidden="true" 
    />

    {@html thirdPartyJSTracking}
</div>


<style lang="scss">

.creative--revealer {
    height: 250px;
    position: relative;

    .creative__cta {
        position: absolute;
        height: 100%;
        width: 100%;
        clip: rect(0, auto, auto, 0);
        overflow: hidden;

        /* promoting the button up the layer stack will improve
           perfs on Android devices */
        z-index: 1;
    }

    .creative__button {
        position: absolute;
    }

    /** 
        Options to position the button layer 
    */ 
    :global( .creative__button--left ) { left: 0; }
    :global( .creative__button--center ) { left: 50%; transform: translate(-50%, 0); }
    :global( .creative__button--right ) { right: 0; }

    :global( .creative__button--top)  { top: 0; }
    :global( .creative__button--middle ) { top: 50%; transform: translate(0, -50%); }
    :global( .creative__button--bottom ) { bottom: 0; }

    :global( .creative__button--center.creative__button--middle ) {
        transform: translate(-50%, -50%);
    }
}

</style>