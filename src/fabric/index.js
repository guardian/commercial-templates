import { getIframeId, resizeIframeHeight, sendMessage } from '../_shared/js/messages.js';
import { write, div } from '../_shared/js/dom.js';

getIframeId()
.then(resizeIframeHeight)
.then(() => {
    let scrollType = '[%ScrollType%]';
    onViewport(({ width }) => {
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
    });
});

function insertBgImage(creativeLink, backgroundImage, backgroundRepeat) {
    let image = div({ className: 'creative__background' });
    Object.assign(image.style, {
        backgroundImage: `url('${backgroundImage}')`,
        backgroundRepeat
    });
    creativeLink.insertBefore(image, creativeLink.firstChild);
    return image;
}
