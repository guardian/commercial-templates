import { read, write } from './dom.js';

let toggles = {};

export function enableToggles(rootNode = document, closeOnInit = true, callback = null) {
    Array.from(rootNode.getElementsByClassName('js-toggle')).forEach(toggle => enableToggle(toggle, closeOnInit, callback));
}

function enableToggle(toggle, closeOnInit = true, callback = null) {
    let targetId = toggle.getAttribute('aria-controls')
    let target = document.getElementById(targetId);
    let isOpen = toggle.getAttribute('aria-expanded') === 'true';
    let open = tog.bind(null, true, toggle, target, callback);
    let close = tog.bind(null, false, toggle, target, callback);

    toggles[targetId] ? toggles[targetId].push(toggle) : (toggles[targetId] = [toggle]);

    toggle.addEventListener('click', () => {
        if( isOpen ) {
            close().then(updateIsOpen);
        } else {
            open().then(updateIsOpen);
        }
    });

    return (closeOnInit ? close() : open())
        .then(updateIsOpen);

    function updateIsOpen(_isOpen) {
        isOpen = _isOpen;
    }
}

function tog(doOpen, toggle, target, callback) {
    return write(() => {
        target.setAttribute('aria-expanded', doOpen);
        toggles[target.id].forEach(toggle => toggle.setAttribute('aria-expanded', doOpen));
    }).then(() => {
        if( callback ) {
            callback(doOpen, toggle, target);
        }
        return doOpen;
    });
}
