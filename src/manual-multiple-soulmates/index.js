import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';
import { cleanupButtons } from '../_shared/js/creatives.js';

cleanupButtons();

getIframeId()
.then(() => getWebfonts())
.then(resizeIframeHeight);
