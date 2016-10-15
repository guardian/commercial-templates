import { read, write } from './dom.js';

let toggles = {};

export function enableToggles(rootNode = document, closeOnInit = true, callback = null) {
    Array.from(rootNode.getElementsByClassName('js-toggle')).forEach(toggle => enableToggle(toggle, closeOnInit, callback));
}

function enableToggle(toggle) {
    const target = document.getElementById(toggle.getAttribute('aria-controls'));

    toggle.addEventListener('click', () => {
        if( target.hasAttribute('hidden') ) {
            open();
        } else {
            close();
        }
    });

    return close();

    function close() {
        return write(() => {
            toggle.setAttribute('aria-expanded', 'false');
            target.setAttribute('hidden', 'hidden');
        });
    }

    function open() {
        return write(() => {
            toggle.setAttribute('aria-expanded', 'true');
            target.removeAttribute('hidden');
        });
    }
}
