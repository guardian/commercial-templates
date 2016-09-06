import { read, write } from './dom.js';

export function enableToggles() {
    Array.from(document.getElementsByClassName('js-toggle')).forEach(enableToggle);
}

function enableToggle(toggle) {
    const target = document.getElementById(toggle.getAttribute('aria-controls'));
    return close();

    toggle.addEventListener('click', () => {
        if( target.hasAttribute('hidden') ) {
            open();
        } else {
            close();
        }
    });

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
