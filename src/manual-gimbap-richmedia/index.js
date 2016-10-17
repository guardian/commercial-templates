import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';

getIframeId()
    .then(() => Promise.all([getWebfonts(), formatGimbap()]))
    .then(resizeIframeHeight);

function formatGimbap() {

    let componentTone   = '[%ComponentTone%]';
    let gimbapEffects   = '[%GimbapEffects%]';

    [
        ['date','[%Offer1Date%]'],
        ['price','[%Offer1Price%]'],
        ['place', '[%Offer1Place%]'],
        ['saving', '[%Offer1Discount%]'],
        ['date','[%Offer2Date%]'],
        ['price','[%Offer2Price%]'],
        ['place', '[%Offer2Place%]'],
        ['saving', '[%Offer2Discount%]']
    ].forEach(checkMeta);

    Array.from(document.getElementsByClassName('gimbap-logo')).forEach(insertHeaderSvg);

    if (gimbapEffects === 'yes') Array.from(document.getElementsByClassName('gimbap--simple')).forEach(addEffectClass);

    function checkMeta(pair,index,array){
        if(pair[1]) {
            if(index < array.length/2){
                removeHideClass(Array.from(document.getElementsByClassName('gimbap-richmedia__meta--' + pair[0]))[0])
            }else{
                removeHideClass(Array.from(document.getElementsByClassName('gimbap-richmedia__meta--' + pair[0]))[1])
            }
        }
    }

    function removeHideClass(div){
        div.classList.remove('metaHide');
    }

    function insertHeaderSvg(div) {
        div.insertAdjacentHTML('afterbegin', logoSvgs[componentTone]);
    }

    function addEffectClass(div) {
        div.className += " gimbap--effects";
    }
}