import { getIframeId, onViewport, onScroll, sendMessage, resizeIframeHeight } from '../../_shared/js/messages.js';
import { write } from '../../_shared/js/dom.js';

let layer2 = document.getElementById('layer2');

if( layer2.classList.contains('creative__layer2--animation-disabled') ) {
    write(() => layer2.style.backgroundPosition = '[%Layer2BackgroundPosition%]');
}

let isMobile = window.matchMedia('(max-width: 739px)').matches;

if( !isMobile && layer2.classList.contains('creative__layer2--animation-enabled') ) {
    layer2.classList.add('is-animating');
}
