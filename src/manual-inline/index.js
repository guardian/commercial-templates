import { getIframeId, resizeIframeHeight,getWebfonts } from '../_shared/js/messages.js';
import { portify } from '../_shared/js/dev';

getIframeId()
    .then(getWebfonts())
    .then(resizeIframeHeight);