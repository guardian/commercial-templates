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
    return (props = {}, attrs = {}) => {
        let elem = document.createElement(tagName);
        Object.assign(elem, props);
        Object.keys(attrs).forEach(attr => elem.setAttribute(attr, attrs[attr]));
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
