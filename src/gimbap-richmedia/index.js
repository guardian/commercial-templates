import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom';

reportClicks();
getIframeId()
    .then(() => Promise.all([getWebfonts(), formatGimbap(), reportClicks()]))
    .then(() => resizeIframeHeight());

function formatGimbap() {

    let componentTone   = '[%ComponentTone%]';

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

    function checkMeta(pair,index,array){
        return write(() => {
            if (pair[1]) {
                if (index < array.length / 2) {
                    removeHideClass(Array.from(document.getElementsByClassName('gimbap-richmedia__meta--' + pair[0]))[0])
                } else {
                    removeHideClass(Array.from(document.getElementsByClassName('gimbap-richmedia__meta--' + pair[0]))[1])
                }
            }
        })
    }

    function removeHideClass(div){
        return write(() => {
            div.classList.remove('metaHide');
        });
    }

    function insertHeaderSvg(div) {
        return write(() => {
            div.insertAdjacentHTML('afterbegin', logoSvgs[componentTone]);
        });
    }
}
