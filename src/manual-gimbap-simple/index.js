// Webfonts
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';

getIframeId()
    .then(() => Promise.all([getWebfonts(), formatGimbap()]))
.then(resizeIframeHeight);

function formatGimbap() {

    let linksWithArrows = '[%linksWithArrows%]'
    let componentTone   = '[%componenttone%]'

    Array.from(document.getElementsByClassName('gimbap-logo')).forEach(insertHeaderSvg);

    if (linksWithArrows === 'yes') Array.from(document.getElementsByClassName('gimbap__cta--simple')).forEach(showArrow);

    function showArrow (div) {
        div.insertAdjacentHTML('beforeend', arrowRightSvg)
    }

    function insertHeaderSvg(div) {
        div.insertAdjacentHTML('afterbegin', logoSvgs[componentTone]);
    }
};