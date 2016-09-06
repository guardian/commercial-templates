import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';
import { enableToggles } from '../_shared/js/ui.js';
import { addTrackingPixel } from '../_shared/js/ads.js';

getIframeId().then(() => {
    enableToggles();
    addTrackingPixel(document.getElementById('creative'));
    getWebfonts(['GuardianSansWeb', 'GuardianTextSansWeb'])
    .then(resizeIframeHeight);
});
