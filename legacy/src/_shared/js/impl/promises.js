export function timeout(promise, delay) {
    return Promise.race([
        new Promise(resolve => window.setTimeout(resolve, delay)),
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
