import { getIframeId, getWebfonts, resizeIframeHeight, onScroll, onViewport, reportClicks } from '../../_shared/js/messages';
import { enableToggles } from '../../_shared/js/ui';

enableToggles();
reportClicks();
getIframeId()
.then(() => getWebfonts())
.then(resizeIframeHeight);
