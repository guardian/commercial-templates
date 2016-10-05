import { getIframeId, resizeIframeHeight,getWebfonts } from '../_shared/js/messages.js';

getIframeId()
    .then(() => getWebfonts())
    .then(resizeIframeHeight);