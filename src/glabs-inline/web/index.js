import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from
    '../../_shared/js/messages.js';
import { write } from '../../_shared/js/dom.js';

reportClicks();
getIframeId()
.then(() => getWebfonts())
.then(() => resizeIframeHeight());
