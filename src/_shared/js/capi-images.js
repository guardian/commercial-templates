// Creates a set of source elements for an image.
function buildSources (sourceData) {

	let sourcesFragment = document.createDocumentFragment();

	sourceData.forEach(source => {

		let hidpi = document.createElement('source');
		hidpi.media = `(min-width: ${source.minWidth}px) and
			(-webkit-min-device-pixel-ratio: 1.25),
			(min-width: ${source.minWidth}px) and (min-resolution: 120dpi)`;
		hidpi.sizes = source.sizes;
		hidpi.srcset = `${source.hidpiSrcset}`;

		let lodpi = document.createElement('source');
		lodpi.media = `(min-width: ${source.minWidth}px)`;
		lodpi.sizes = source.sizes;
		lodpi.srcset = `${source.lodpiSrcset}`;

		sourcesFragment.appendChild(hidpi);
		sourcesFragment.appendChild(lodpi);

	});

	return sourcesFragment;

}

// Creates a picture element with responsive sources, with fallback for IE.
function createPicture (imageInfo, imageElem) {

	// Check that the srcset attribute is supported
	if ('srcset' in imageElem) {

		let picture = document.createElement('picture');
		let sources = buildSources(imageInfo.sources);

		picture.appendChild(sources);
		picture.appendChild(imageElem);
		return picture;

	} else {
		return imageElem;
	}

}

// Inserts an image into the card, using the data derived from cAPI.
export function insertImage (imageContainer, imageInfo, classes, override) {

	let image = document.createElement('img');
	image.className = classes.join(' ');

	if (override) {

		image.src = override;
		imageContainer.appendChild(image);

	} else {

		image.src = imageInfo.backupSrc;
		imageContainer.appendChild(createPicture(imageInfo, image));

	}

	return image;

}

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
export function generatePicture(imageInfo, classes) {

	let image = `<img class="${classes.join(' ')}" src="${imageInfo.backupSrc}">`;

	// Check that the srcset attribute is supported
	if ('srcset' in new Image()) {
		return `<picture>
							${imageInfo.sources.map(generateSources).join('')}
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
