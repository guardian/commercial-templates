import { getIframeId, resizeIframeHeight, onViewport, onScroll, sendMessage } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

getIframeId()
.then(resizeIframeHeight)
.then(() => {
    let scrollType = '[%ScrollType%]';
    let onScrolling = false;
    onViewport(({ height, width }) => {
        let isMobile = width <= 739;
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
            sendMessage('parallax-background', { backgroundColour, backgroundImage: backgroundImage, backgroundRepeat });
        }

        if( !isMobile ) {
            if( !onScrolling ) {
                let layer2 = document.getElementsByClassName('js-layer2')[0];
                onScrolling = true;
                onScroll(({ top, bottom }) => {
                    if( 0 < bottom && top < height ) {
                        layer2.classList.add('is-animating');
                        return false;
                    }
                });
            } else {
                write(() => layer2.style.backgroundPosition = '[%Layer2BackgroundPosition%]');
            }
        }
    });
});
