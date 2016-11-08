import { getIframeId, resizeIframeHeight, reportClicks, getWebfonts } from '../../_shared/js/messages.js';

reportClicks();
getIframeId()
    .then(() => getWebfonts())
    .then(resizeIframeHeight);
