import { getIframeId, getWebfonts, reportClicks, resizeIframeHeight } from '../../_shared/js/messages';
import { cleanupButtons } from '../../_shared/js/creatives';

cleanupButtons();
reportClicks();

getIframeId()
.then(() => getWebfonts())
.then(resizeIframeHeight);
