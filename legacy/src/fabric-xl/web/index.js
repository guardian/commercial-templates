import { getIframeId, sendMessage, resizeIframeHeight, reportClicks } from '../../_shared/js/messages.js';
import { write } from '../../_shared/js/dom.js';

let linkDesktop = document.getElementById('linkDesktop');


getIframeId()
.then(() => {
    reportClicks();
    resizeIframeHeight(500);

    const isMobile = window.matchMedia('(max-width: 739px)').matches;
    const isTablet = window.matchMedia('(min-width: 740px) and (max-width: 979px)').matches;
    handleBackground(isMobile, isTablet);


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

});

