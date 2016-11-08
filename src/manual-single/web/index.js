import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../../_shared/js/messages.js';

reportClicks();
getIframeId()
.then(() => getWebfonts())
.then(resizeIframeHeight);
