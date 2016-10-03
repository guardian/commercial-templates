const matches = 'matches' in Element.prototype ? 'matches' : 'msMatchesSelector';
const closest = 'closest' in Element.prototype ?
    (node, selector) => node.closest(selector) :
    (node, selector) => {
        while( node && !node[matches](selector) ) {
            node = node.parentNode;
        }

        return node;
    };

if( ! window.requestAnimationFrame ) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || (callback => setTimeout(callback, 1000 / 60));
}

function write(fn, ...args) {
    return new Promise(resolve => window.requestAnimationFrame(() => {
        resolve(fn(...args));
    }));
}

function read(fn, ...args) {
    return new Promise(resolve => window.requestAnimationFrame(() => {
        resolve(fn(...args));
    }));
}

function createElement(tagName) {
    return function(props = {}, attrs = {}) {
        let elem = document.createElement(tagName);
        Object.assign(elem, props);
        Object.keys(attrs).forEach(attr => img.setAttribute(attr, attrs[attr]));
        return elem;
    }
}

let img = createElement('img');
let div = createElement('div');

export {
    closest,
    write,
    read,
    img,
    div
};
