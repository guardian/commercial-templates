import { getIframeId, onViewport, onScroll, sendMessage, resizeIframeHeight, reportClicks } from '../../_shared/js/messages.js';
import { write } from '../../_shared/js/dom.js';

let layer2 = document.getElementById('layer2');
let linkDesktop = document.getElementById('linkDesktop');

if( layer2.classList.contains('creative__layer2--animation-disabled') ) {
    write(() => layer2.style.backgroundPosition = '[%Layer2BackgroundPosition%]');
}

getIframeId()
.then(() => {
    reportClicks();

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
    let scrollType = '[%BackgroundScrollType%]';
    let backgroundColour = '[%BackgroundColour%]';
    let [ backgroundImage, backgroundPosition, backgroundRepeat, creativeLink ] = isMobile ?
        ['[%MobileBackgroundImage%]', '[%MobileBackgroundImagePosition%]', '[%MobileBackgroundImageRepeat%]', document.getElementById('linkMobile')] :
        ['[%BackgroundImage%]', '[%BackgroundImagePosition%]', '[%BackgroundImageRepeat%]', document.getElementById('linkDesktop')];
    
        handlePadding(scrollType);

    if (backgroundColour) {
      document.documentElement.style.backgroundColor = backgroundColour;
    }

    if( !backgroundImage ) return;
    if( scrollType === 'none' ) {
        write(() => {
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

function handlePadding(scrollType) {
    if (scrollType === 'parallax') {
        linkDesktop !== undefined ? linkDesktop.classList.add('is-parallax') : ''; 
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
