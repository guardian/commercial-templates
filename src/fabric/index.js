import { getIframeId, onScroll, onViewport } from '../_shared/js/messages.js';
import { write, div } from '../_shared/js/dom.js';

getIframeId().then(() => {
    let scrollType = '[%ScrollType%]';
    let isMobile = window.matchMedia('(max-width: 739px)').matches;
    let [ backgroundImage, backgroundPosition, backgroundRepeat, creativeLink ] = isMobile ?
        ['[%MobileBackgroundImage%]', '[%MobileBackgroundImagePosition%]', '[%MobileBackgroundImageRepeat%]', document.getElementById('linkMobile')] :
        ['[%BackgroundImage%]', '[%BackgroundImagePosition%]', '[%BackgroundImageRepeat%]', document.getElementById('linkDesktop')];

    if( scrollType === 'none' ) {
        write(() => Object.assign(creativeLink.style, {
            backgroundImage: `url('${backgroundImage}')`,
            backgroundPosition,
            backgroundRepeat
        }));
    } else {
        let viewportHeight = 0;
        onViewport(({ height }) => viewportHeight = height);
        write(insertBgImage, creativeLink, backgroundImage, backgroundRepeat).then(backgroundImageNode => {
            console.log(backgroundImageNode);
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
