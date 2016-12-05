import { read, write } from './dom.js';

let toggles = {};

export function enableToggles(rootNode = document, closeOnInit = true, callback = null) {
    Array.from(rootNode.getElementsByClassName('js-toggle')).forEach(toggle => enableToggle(toggle, closeOnInit, callback));
}

function enableToggle(toggle, closeOnInit = true, callback = null) {
    let targetId = toggle.getAttribute('aria-controls')
    let target = document.getElementById(targetId);
    let open = tog.bind(null, true, toggle, target, callback);
    let close = tog.bind(null, false, toggle, target, callback);

    if( toggles[targetId] ) {
        toggles[targetId].toggles.push(toggle);
    } else {
        toggles[targetId] = {
            isOpen: toggle.getAttribute('aria-expanded') === 'true',
            toggles: [toggle]
        };
    }

    toggle.addEventListener('click', evt => {
        // We prevent this event from triggering a click report, just in case
        evt.stopPropagation();

        if( toggles[targetId].isOpen ) {
            close().then(updateIsOpen);
        } else {
            open().then(updateIsOpen);
        }
    });

    return (closeOnInit ? close() : open())
        .then(updateIsOpen);

    function updateIsOpen(_isOpen) {
        toggles[targetId].isOpen = _isOpen;
    }
}

function tog(doOpen, toggle, target, callback) {
    return write(() => {
        target.setAttribute('aria-expanded', doOpen);
        toggles[target.id].toggles.forEach(toggle => toggle.setAttribute('aria-expanded', doOpen));
    }).then(() => {
        if( callback ) {
            callback(doOpen, toggle, target);
        }
        return doOpen;
    });
}
