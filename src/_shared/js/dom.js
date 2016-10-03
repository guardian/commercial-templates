const matches = 'matches' in Element.prototype ? 'matches' : 'msMatchesSelector';
export const closest = 'closest' in Element.prototype ?
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
