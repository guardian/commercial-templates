import { write } from './dom';

const trackingPixel = '[%Trackingpixel%]';
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
