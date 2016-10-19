import { getIframeId, resizeIframeHeight, onViewport, onScroll, sendMessage } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

getIframeId()
.then(resizeIframeHeight)
.then(() => {
    let scrollType = '[%ScrollType%]';
    let onScrolling = false;
    let hasBackground = false;
    let layer2 = document.getElementById('layer2');

    if( layer2.classList.contains('creative__layer2--animation-disabled') ) {
        write(() => layer2.style.backgroundPosition = '[%Layer2BackgroundPosition%]');
    }

    onViewport(({ height, width }) => {
        let isMobile = width <= 739;

        handleBackground(isMobile);
        handleLayer2(isMobile, height);
    });

    function handleBackground(isMobile) {
        if( !hasBackground ) {
            hasBackground = true;
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
            } else if( scrollType === 'fixed' ) {
                sendMessage('fixed-background', { backgroundColour, backgroundImage: `url('${backgroundImage}')`, backgroundRepeat });
            } else {
                sendMessage('parallax-background', { backgroundColour, backgroundImage: backgroundImage, backgroundRepeat, maxHeight: 500 });
            }
        }
    }

    function handleLayer2(isMobile, height) {
        if( !isMobile ) {
            if( !onScrolling && layer2.classList.contains('creative__layer2--animation-enabled') ) {
                onScrolling = true;
                onScroll(({ top, bottom }) => {
                    if( 0 <= top && bottom <= height ) {
                        layer2.classList.add('is-animating');
                        return false;
                    }
                });
            }
        }
    }
});
