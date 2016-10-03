// necessary when running multiple local services and making CORS requests
export function portify(host, target = '9000') {
    return host.replace('7000', target);
}

let apiBaseUrl = 'https://api.nextgen.guardianapps.co.uk';

/*  The PROD endpoint for Soulmates is not on theguardian.com, so we must detect
    whether we are in DEV or PROD before supplying the full endpoint */
export function deriveEndpoint(host, isPreview) {
    return isPreview ? portify(host): apiBaseUrl;
}
