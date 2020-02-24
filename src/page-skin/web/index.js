var parentBody = window.top.document.body;
parentBody.style.backgroundImage='url(%%VIEW_URL_UNESC%%https://adimage.theguardian.com/pageskins/[%PageSkinFileName%])';
parentBody.style.backgroundAttachment='fixed';
parentBody.style.backgroundPosition='50% 0';
parentBody.style.backgroundRepeat='no-repeat no-repeat';
parentBody.onclick=function(e) {
    var target = e.target;
    if (target.nodeName.toLowerCase() === 'body') {
        window.open('%%CLICK_URL_UNESC%%[%ClickDestination%]');
    }
    return true;
};
var trackingPixel = '[%TrackingPixel%]';
if (trackingPixel) {
    (new Image()).src = trackingPixel;
}
window.top.postMessage('pageskinRendered', '*');