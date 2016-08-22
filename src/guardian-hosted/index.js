import { getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';
import { enableToggles } from '../_shared/js/ui.js';

getWebfonts(['GuardianSansWeb', 'GuardianTextSansWeb'])
    .then(resizeIframeHeight);
enableToggles();
