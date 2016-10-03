export function addSourceset(responseJson) {

  let srcsetFragment = document.createDocumentFragment();

  responseJson.forEach(source => {

    let highDef = document.createElement('source');
    highDef.media = `(min-width: ${source.minWidth}px) and
    (-webkit-min-device-pixel-ratio: 1.25),
    (min-width: ${source.minWidth}px) and (min-resolution: 120dpi)`;
    highDef.sizes = source.sizes;
    highDef.srcset = `${window.location.protocol}${source.highDefSrcset}`;

    let lowDef = document.createElement('source');
    lowDef.media = `(min-width: ${source.minWidth}px)`;
    lowDef.sizes = source.sizes;
    lowDef.srcset = `${window.location.protocol}${source.lowDefSrcset}`;

    srcsetFragment.appendChild(highDef);
    srcsetFragment.appendChild(lowDef);
  });
    return srcsetFragment;
}

export function insertBetweenComments(sources) {

	let pictures = Array.from(document.getElementsByTagName('picture'));

  return write(() => {
		pictures.forEach((picture, index) => picture.insertBefore(sources[index], picture.firstChild));
	});
}

export function checkIcon(responseJson) {
    return responseJson.audioTag ?
        audioIcon :
    responseJson.galleryTag ?
        imageIcon :
    responseJson.videoTag ?
        videoIcon :
        '';
}
