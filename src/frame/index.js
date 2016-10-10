import { getIframeId, getWebfonts, resizeIframeHeight, onScroll, onViewport } from '../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';

enableToggles();
getIframeId()
.then(getWebfonts())
.then(resizeIframeHeight);

//     var Frame = function ($adSlot, params) {
//         this.$adSlot = $adSlot;
//     };
//
//         this.params.target = this.params.newWindow === 'yes' ? '_blank' : '_self';
//             this.$adSlot.addClass('ad-slot--frame');
//             if (this.params.trackingPixel) {
//                 addTrackingPixel(this.$adSlot, this.params.trackingPixel + this.params.cacheBuster);
//             }
//             new Toggles(this.$adSlot[0]).init();
//             return true;
//         }, this);
//     };
