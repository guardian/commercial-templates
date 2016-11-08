import { write } from './dom';

const trackingPixel = '[%Trackingpixel%]';

// Glabs edition links.
const GLABS_EDITION = {
    DEFAULT: '/guardian-labs',
    AU: '/guardian-labs-australia',
    US: '/guardian-labs-us'
};

let pixelTemplate;

export function addTrackingPixel(rootNode) {
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
export function setEditionLink (edition, linkElement) {
    linkElement.href = GLABS_EDITION[edition] || GLABS_EDITION.DEFAULT;
}
