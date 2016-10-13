import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';

getIframeId()
    .then(() => Promise.all([getWebfonts(), formatGimbap()]))
    .then(resizeIframeHeight);

function formatGimbap() {

    let componentTone   = '[%ComponentTone%]';
    let gimbapEffects   = '[%GimbapEffects%]';

    Array.from(document.getElementsByClassName('gimbap-logo')).forEach(insertHeaderSvg);

    if (gimbapEffects === 'yes') Array.from(document.getElementsByClassName('gimbap--simple')).forEach(addEffectClass);

    function insertHeaderSvg(div) {
        div.insertAdjacentHTML('afterbegin', logoSvgs[componentTone]);
    }

    function addEffectClass(div) {
        div.className += " gimbap--effects";
    }
};