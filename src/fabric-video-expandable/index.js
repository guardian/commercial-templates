import { getIframeId, resizeIframeHeight } from '../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';
import { write } from '../_shared/js/dom';

let plusIconAlignment = '[%PlusIconAlignment%]'.toLowerCase().replace(' ', '-');

getIframeId()
.then(() => {
    handleToggle();
    handleCTAs();
});

function handleToggle() {
    Array.from(document.getElementsByClassName('js-container')).forEach(root => enableToggles(root, true, onToggle));
}

function handleCTAs() {
    Array.from(document.getElementsByClassName('creative__cta')).forEach(cta => write(() => cta.classList.add(plusIconAlignment)));
}

function onToggle(isOpen) {
    resizeIframeHeight(isOpen ? 500 : 250);
}
