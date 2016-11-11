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

    if( !pixelTemplate ) {
        pixelTemplate = document.createElement('img');
        pixelTemplate.className = 'creative__pixel';
    }

    const pixel = pixelTemplate.cloneNode();
    pixel.src = '[%Trackingpixel%]%%CACHEBUSTER%%';
    return write(() => rootNode.appendChild(pixel));
}

// Sets the 'href' of the glabs edition link to the correct URL.
function setEditionLink (host, edition, linkElement) {
    linkElement.href = `${clickMacro}${host}/${GLABS_EDITION[edition] || GLABS_EDITION.DEFAULT}`;
}

export {
    clickMacro,
    addTrackingPixel,
    setEditionLink
};
