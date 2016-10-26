import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../_shared/js/messages';

reportClicks();
getIframeId()
    .then(() => getWebfonts())
    .then(resizeIframeHeight);
