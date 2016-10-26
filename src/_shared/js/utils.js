
function formatPrice(price) {
    return `<span>£${price.toFixed(2)}</span>`;
}

function formatDuration(duration) {
    return `${duration} night${duration > 1 ? 's' : ''}`;
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

export {
    formatPrice,
    formatDuration,
    URLSearchParams
};
