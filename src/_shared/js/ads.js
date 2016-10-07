import { write } from './dom';

const trackingPixel = '[%Trackingpixel%]';

// Glabs edition links.
const GLABS_EDITION = {
	default: 'https://theguardian.com/guardian-labs',
	au: 'https://theguardian.com/guardian-labs-australia',
	us: 'https://theguardian.com/guardian-labs-us'
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

	let link = GLABS_EDITION.default;

	if (edition === 'AU') {
		link = GLABS_EDITION.au;
	} else if (edition === 'US') {
		link = GLABS_EDITION.us;
	}

	linkElement.href = link;

}
