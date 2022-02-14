import { getIframeId, getWebfonts, resizeIframeHeight, onViewport, reportClicks } from '../../_shared/js/messages';
import addColourContrastClass from '../../_shared/js/hosted-colours.js';

reportClicks();
getIframeId()
    .then(() => addColourContrastClass())
    .then(() => getWebfonts())
    .then(function(){
        onViewport(() => resizeIframeHeight());
    });
