import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../../_shared/js/messages.js';
import { cleanupButtons } from '../../_shared/js/creatives.js';

cleanupButtons();

reportClicks();
getIframeId()
.then(() => getWebfonts())
.then(resizeIframeHeight);
