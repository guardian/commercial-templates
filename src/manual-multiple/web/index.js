import { getIframeId, getWebfonts, reportClicks, resizeIframeHeight, onViewport } from '../../_shared/js/messages';
import { cleanupButtons } from '../../_shared/js/creatives';

cleanupButtons();
reportClicks();

getIframeId()
.then(() => getWebfonts())
.then(() => {
    let lastWidth;
    onViewport(({ width }) => {
        if( width !== lastWidth ) {
            lastWidth = width;
            resizeIframeHeight();
        }
    });
});
