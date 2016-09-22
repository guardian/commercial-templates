export function timeout(promise, delay) {
    return Promise.race([
        new Promise((_, reject) => window.setTimeout(reject, delay)),
        promise
    ]);
}
