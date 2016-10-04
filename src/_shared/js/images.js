import { write } from './dom';

export function addSourceset(responseJson) {

  return responseJson.map(source => {

    let highDef = document.createElement('source');
    highDef.media = `(min-width: ${source.minWidth}px) and
    (-webkit-min-device-pixel-ratio: 1.25),
    (min-width: ${source.minWidth}px) and (min-resolution: 120dpi)`;
    highDef.sizes = source.sizes;
    highDef.srcset = `${source.hidpiSrcset}`;

    let lowDef = document.createElement('source');
    lowDef.media = `(min-width: ${source.minWidth}px)`;
    lowDef.sizes = source.sizes;
    lowDef.srcset = `${source.lodpiSrcset}`;

    return [highDef, lowDef];
   });
}

export function insertSrcset(sources) {

    let picture = document.getElementsByTagName('picture')[0];

    return write(() => {
      sources.forEach((source, index) => {
        picture.insertBefore(source[0], picture.firstChild);
        picture.insertBefore(source[1], picture.firstChild);
      });
    });
  }

export function buildImages(sources) {

  let imageTag = document.getElementsByTagName('img')[0];

  (imageTag.srcset === '')? insertSrcset(sources) : imageTag;
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
