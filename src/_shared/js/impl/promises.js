export function timeout(promise, delay) {
    return Promise.race([
        new Promise((_, reject) => window.setTimeout(reject, delay)),
        promise
    ]);
}

let promise = null;
export function soon(fn) {
    if( promise === null ) {
        promise = Promise.resolve()
        .then(() => promise = null)
    }
    return promise.then(fn);
}
