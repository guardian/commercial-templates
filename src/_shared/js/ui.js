import { read, write } from './dom.js';

export function enableToggles() {
    Array.from(document.getElementsByClassName('js-toggle')).forEach(enableToggle);
}

function enableToggle(toggle) {
    const target = document.getElementById(toggle.getAttribute('aria-controls'));
    close();

    toggle.addEventListener('click', () => {
        if( target.hasAttribute('hidden') ) {
            open();
        } else {
            close();
        }
    });

    function close() {
        write(() => {
            toggle.setAttribute('aria-expanded', 'false');
            target.setAttribute('hidden', 'hidden');
        });
    }

    function open() {
        write(() => {
            toggle.setAttribute('aria-expanded', 'true');
            target.removeAttribute('hidden');
        });
    }
}
