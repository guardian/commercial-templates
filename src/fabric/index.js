import { getIframeId, resizeIframeHeight, onScroll, onViewport } from '../_shared/js/messages.js';
import { write, div } from '../_shared/js/dom.js';

getIframeId()
.then(resizeIframeHeight)
.then(() => {
    let scrollType = '[%ScrollType%]';
    let isMobile = window.matchMedia('(max-width: 739px)').matches;
    let [ backgroundImage, backgroundPosition, backgroundRepeat, creativeLink ] = isMobile ?
        ['[%MobileBackgroundImage%]', '[%MobileBackgroundImagePosition%]', '[%MobileBackgroundImageRepeat%]', document.getElementById('linkMobile')] :
        ['[%BackgroundImage%]', '[%BackgroundImagePosition%]', '[%BackgroundImageRepeat%]', document.getElementById('linkDesktop')];

    if( !backgroundImage ) return;

    if( scrollType === 'none' ) {
        write(() => Object.assign(creativeLink.style, {
            backgroundImage: `url('${backgroundImage}')`,
            backgroundPosition,
            backgroundRepeat
        }));
    } else {
        let speedFactor = scrollType === 'fixed' ? 1 : 0.3;
        write(insertBgImage, creativeLink, backgroundImage, backgroundRepeat)
        .then(backgroundImageNode => {
            onViewport(({ height }) => {
                write(() => backgroundImageNode.style.backgroundSize = `100% ${height}px`);
            });
            onScroll(({ top }) => {
                write(() => backgroundImageNode.style.backgroundPositionY = `-${top * speedFactor}px`)
            });
        });
    }
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
