import { getIframeId, getWebfonts, reportClicks, resizeIframeHeight, onViewport } from '../../_shared/js/messages';
import { cleanupButtons } from '../../_shared/js/creatives';

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
