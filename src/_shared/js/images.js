export function checkIcon(responseJson) {
    return responseJson.audioTag ?
        audioIcon :
    responseJson.galleryTag ?
        imageIcon :
    responseJson.videoTag ?
        videoIcon :
        '';
}