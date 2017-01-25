import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks, onViewport } from '../../_shared/js/messages.js';
import { cleanupButtons } from '../../_shared/js/creatives.js';

cleanupButtons(['[%Offer1LinkText%]', '[%Offer2LinkText%]', '[%Offer3LinkText%]', '[%Offer4LinkText%]']);

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
