import { getIframeId, sendMessage, resizeIframeHeight, reportClicks } from '../../_shared/js/messages';
import { addPixel } from '../../_shared/js/ads';
import { enableToggles } from '../../_shared/js/ui';
import { write, div } from '../../_shared/js/dom';

let researchPixel = '[%Researchpixel%]';
let trackingPixel = '[%Trackingpixel%]';
let showLabel = '[%ShowLabel%]';
let labelHeight = 22;

if( researchPixel ) addPixel(researchPixel);
if( trackingPixel ) addPixel(trackingPixel);

getIframeId()
.then(() => {
    if( showLabel === 'yes' ) resizeIframeHeight();

    reportClicks();
    handleBackground();
    handleToggle();
});

function handleBackground() {
    let isMobile = window.matchMedia('(max-width: 739px)').matches;
    let isTablet = window.matchMedia('(min-width: 740px) and (max-width: 979px)').matches;
    let scrollType = '[%ScrollType%]';
    let backgroundColour = '[%BackgroundColour%]';
    let [ backgroundImage, backgroundPosition, backgroundRepeat, creativeLink ] = isMobile ?
        ['[%MobileBackgroundImage%]', '[%MobileBackgroundImagePosition%]', '[%MobileBackgroundImageRepeat%]', document.getElementById('linkMobile')] :
        ['[%BackgroundImage%]', '[%BackgroundImagePosition%]', '[%BackgroundImageRepeat%]', document.getElementById('linkDesktop')];

    if( !backgroundImage ) return;

    if( scrollType === 'none' ) {
        write(() => {
            document.documentElement.style.backgroundColor = backgroundColour;
            Object.assign(creativeLink.style, {
                backgroundImage: `url('${backgroundImage}')`,
                backgroundPosition,
                backgroundRepeat
            });
        });
    } else {
        sendMessage('background', {
            scrollType: scrollType === 'parallax' && (isMobile || isTablet) ? 'fixed' : scrollType,
            backgroundColour,
            backgroundImage: `url('${backgroundImage}')`,
            backgroundRepeat,
            backgroundPosition
        });
    }
}

function handleToggle() {
    Array.from(document.getElementsByClassName('js-container')).forEach(root => enableToggles(root, true, onToggle));
}

function onToggle(isOpen) {
    resizeIframeHeight((isOpen ? 500 : 250) + (showLabel === 'yes' ? labelHeight : 0));
}
