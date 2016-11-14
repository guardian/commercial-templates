import { getIframeId, getWebfonts, reportClicks } from '../../_shared/js/messages';
import { enableToggles } from '../../_shared/js/ui';

enableToggles();
getIframeId()
.then(() => {
    reportClicks();
    getWebfonts();
});
