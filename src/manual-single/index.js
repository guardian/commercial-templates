import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';

getIframeId()
.then(getWebfonts)
.then(resizeIframeHeight);
