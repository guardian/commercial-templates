import { getIframeId, resizeIframeHeight, reportClicks, getWebfonts, onViewport } from '../../_shared/js/messages.js';

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
