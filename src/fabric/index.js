import { getIframeId, resizeIframeHeight, onScroll } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

getIframeId().then(() => {
    resizeIframeHeight();

    const scrollType = '[%ScrollType%]';
    const isMobile = window.matchMedia('(min-width: 740px)').matches;

    if( scrollType === 'fixed' ) {
        onScroll((...args) => {
            console.log('yooohooo, received:');
            console.dir(args);
        });
    } else if( scrollType === 'parallax' && !isMobile ) {
        onScroll(({ rect: { bottom: slotBottom, height: slotHeight }, viewport: { height: viewportHeight }}) => {
            const verticalOffset = (viewportHeight - slotBottom + slotHeight / 2) / viewportHeight * 100;
            write(() => background.style.backgroundPositionY = `${verticalOffset}%`);
        });
    }
});
