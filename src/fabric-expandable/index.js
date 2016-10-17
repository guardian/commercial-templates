import { getIframeId, resizeIframeHeight, sendMessage } from '../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';
import { write, div } from '../_shared/js/dom';

getIframeId()
.then(() => {
    handleScroll();
    handleToggle();
});

function handleScroll() {
    let isMobile = window.matchMedia('(max-width: 739px)').matches;
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
    } else if( scrollType === 'fixed' ) {
        sendMessage('fixed-background', { backgroundColour, backgroundImage: `url('${backgroundImage}')`, backgroundRepeat });
    } else {
        sendMessage('parallax-background', { backgroundColour, backgroundImage: backgroundImage, backgroundRepeat, maxHeight: 500 });
    }
}

function handleToggle() {
    Array.from(document.getElementsByClassName('js-container')).forEach(root => enableToggles(root, true, onToggle));
}

function onToggle(isOpen) {
    resizeIframeHeight(isOpen ? 500 : 250);
}
