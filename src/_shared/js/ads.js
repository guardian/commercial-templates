import { write } from './dom';

let trackingPixel = '[%Trackingpixel%]';
let clickMacro = '%%CLICK_URL_UNESC%%';
let pixelTemplate;

// Glabs edition links.
const GLABS_EDITION = {
    DEFAULT: 'guardian-labs',
    AU: 'guardian-labs-australia',
    US: 'guardian-labs-us'
};

function addTrackingPixel(rootNode) {
    if( !trackingPixel ) return;

function addPixel(url) {
    loadImage(url);
}

function loadImage(url) {
    new Image().src = url;
}

// Sets the 'href' of the glabs edition link to the correct URL.
function setEditionLink (host, edition, linkElement) {
    linkElement.href = `${clickMacro}${host}/${GLABS_EDITION[edition] || GLABS_EDITION.DEFAULT}`;
}

export {
    clickMacro,
    addTrackingPixel,
    addPixel,
    setEditionLink
};
