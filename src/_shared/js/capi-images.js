// Creates the HTML for a s set of source elements for an image.
function generateSources(source) {
    return `
    <source
        media="(min-width: ${source.minWidth}px) and (-webkit-min-device-pixel-ratio: 1.25),
                     (min-width: ${source.minWidth}px) and (min-resolution: 120dpi)"
        srcset="${source.hidpiSrcset}"
        sizes="${source.sizes}"
    </source>
    <source
        media="(min-width: ${source.minWidth}px)"
        srcset="${source.lodpiSrcset}"
        sizes="${source.sizes}"
    </source>`
}

// Generates the HTML for a picture element with responsive sources
export function generatePicture({ url, classes = [], sources = null, alt = '' }) {
    let image = `<img class="${classes.join(' ')}" src="${url}" alt="${alt}">`;

    // Check that the srcset attribute is supported
    if (sources && 'srcset' in new Image()) {
        return `<picture>
                    ${sources.map(generateSources).join('')}
                    ${image}
                </picture>`;
    }
    else {
        return image;
    }
}

// Retrieves svg icons for capi single.
export function checkIcon (articleInfo) {

    if (articleInfo.audioTag) {
        return audioIcon;
    } else if (articleInfo.galleryTag) {
        return imageIcon;
    } else if (articleInfo.videoTag) {
        return videoIcon;
    }

    return '';

}
