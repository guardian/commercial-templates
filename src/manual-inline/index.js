import { getIframeId, resizeIframeHeight, reportClicks,getWebfonts } from '../_shared/js/messages.js';

getIframeId()
    .then(() => getWebfonts())
    .then(() => reportClicks())
    .then(resizeIframeHeight);