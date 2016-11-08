import { getIframeId, resizeIframeHeight } from '../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';
import { write } from '../_shared/js/dom';

let showLabel = '[%ShowLabel%]';
let video = document.getElementById('YTPlayer');

if('[%VideoOptions%]' === 'right-aligned') {
    write(() => video.classList.add('gs-container'));
}

getIframeId()
.then(() => {
    if( showLabel === 'yep' ) resizeIframeHeight();

    handleToggle();
    handleCTAs();
});

function handleToggle() {
    enableToggles(document, true, onToggle);
}

function handleCTAs() {
    Array.from(document.getElementsByClassName('creative__cta')).forEach(cta => write(() => cta.classList.add(plusIconAlignment)));
}

function onToggle(isOpen, toggle, target) {
    resizeIframeHeight(isOpen ? 500 : 250);
    setTimeout((() => {
        if (video.src.indexOf('autoplay') === -1) {
            video.src += '&amp;autoplay=1';
        } else {
            video.src = video.src.replace(
                isOpen ? 'autoplay=0' : 'autoplay=1',
                isOpen ? 'autoplay=1' : 'autoplay=0'
            );
        }
    }), 1000);
}
