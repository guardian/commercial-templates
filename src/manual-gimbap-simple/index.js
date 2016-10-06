// Webfonts
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';

getIframeId()
    .then(() => Promise.all([getWebfonts(), formatGimbap()]))
.then(resizeIframeHeight);

function formatGimbap() {

    let linksWithArrows = '[%linksWithArrows%]'
    let componentTone   = '[%componenttone%]'
    let gimbapEffects   = '[%gimbapEffects%]'

    Array.from(document.getElementsByClassName('gimbap-logo')).forEach(insertHeaderSvg);

    if (linksWithArrows === 'yes') Array.from(document.getElementsByClassName('gimbap__cta--simple')).forEach(showArrow);

    if (gimbapEffects === 'yes') Array.from(document.getElementsByClassName('gimbap--simple')).forEach(addEffectClass);

    function showArrow (div) {
        div.insertAdjacentHTML('beforeend', arrowRightSvg)
    }

    function insertHeaderSvg(div) {
        div.insertAdjacentHTML('afterbegin', logoSvgs[componentTone]);
    }

    function addEffectClass(div) {
        div.className += " gimbap--effects";
    }
};