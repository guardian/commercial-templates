import { hideIframe } from '../../_shared/js/messages';

function formatPrice(price) {
    return `<span>£${price.toFixed(2)}</span>`;
}

function formatDuration(duration) {
    return `${duration} night${duration > 1 ? 's' : ''}`;
}

function hideOnError(error, type) {
    console.error(`Error in rendering ${type} native style. Hiding component.`);
    hideIframe();
    throw error;
}

let URLSearchParams = 'URLSearchParams' in window ? window.URLSearchParams : function() {
    let params = [];

    function append(name, value) {
        params.push([name, value]);
    }

    function toString() {
        return params.map(([name, value]) => `${name}=${encodeURIComponent(value)}`).join('&');
    }

    return Object.freeze({ append, toString });
};

function once(fn, context) {
    var result;

    return function() {
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

export {
    formatPrice,
    formatDuration,
    hideOnError,
    URLSearchParams,
    once
};
