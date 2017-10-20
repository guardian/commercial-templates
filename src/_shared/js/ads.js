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

function addTrackingPixel() {
    if( !trackingPixel ) return;
    loadImage(trackingPixel);
}

function addPixel(url) {
    loadImage(url);
}

function addViewabilityTracker(creativeId) {
    var tracker = document.getElementById('viewabilityTracker');
    if( !tracker ) return;
    tracker = tracker.firstChild.nodeValue.trim();
    if( !tracker ) return;
    write(() => document.body.insertAdjacentHTML('beforeend', tracker.replace('INSERT_UNIQUE_ID', creativeId)));
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
