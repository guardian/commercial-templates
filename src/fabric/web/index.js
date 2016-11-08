import { getIframeId, onViewport, onScroll, sendMessage, resizeIframeHeight } from '../../_shared/js/messages.js';
import { write } from '../../_shared/js/dom.js';

let showLabel = '[%ShowLabel%]';
let layer2 = document.getElementById('layer2');

if( layer2.classList.contains('creative__layer2--animation-disabled') ) {
    write(() => layer2.style.backgroundPosition = '[%Layer2BackgroundPosition%]');
}

getIframeId()
.then(() => {
    if( showLabel === 'yep' ) resizeIframeHeight();

    let isMobile = window.matchMedia('(max-width: 739px)').matches;
    let isTablet = window.matchMedia('(min-width: 740px) and (max-width: 979px)').matches;

    handleBackground(isMobile, isTablet);

    if( !isMobile && layer2.classList.contains('creative__layer2--animation-enabled') ) {
        onViewport(({ height }) => {
            handleLayer2(height);
            return false;
        });
    }
});

function handleBackground(isMobile, isTablet) {
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
            })
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

function handleLayer2(height) {
    onScroll(({ top, bottom }) => {
        if( 0 <= top && bottom <= height ) {
            layer2.classList.add('is-animating');
            return false;
        }
    });
}
