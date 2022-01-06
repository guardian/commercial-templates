import { getIframeId, onScroll, onViewport, reportClicks } from '../../_shared/js/messages';
import { write } from '../../_shared/js/dom';

const VIDEO_MARCOS = {
    'videoUrl': '[%VideoURL%]',
    'videoPosterImage': '[%VideoBackupImage%]',
    'mobileVideoUrl': '[%VideoURLMobile%]',
    'mobilePosterImage': '[%MobileVideoBackupImage%]',
}

getIframeId()
.then(() => {
    reportClicks();
  
    let isUpdating = false;
    const isMobile = window.innerWidth < 740;

    // We want to know when the slot is in view so we can control the video
    // and animation
    let inView = false;

    // We'll need an onScroll listener that will be add inside onViewport,
    // but since onViewport can fire multiple times, we want to make sure
    // the onScroll listener is added only once.
    let onScrolling = false;

    // We'll start the video when the slot is in view, but we want this
    // process to happen only once. When the video ends, we let everyone
    // know about it.
    let video = document.getElementsByTagName('video');


    if ( (VIDEO_MARCOS['videoUrl'] && VIDEO_MARCOS['mobileVideoUrl']) == '' ) return;

    let played = false; 
    video.onended = () => played = true;

    // Add video source
    // Add video poster image
    //Add class name for mobile video
    let videoSrc;
    let posterImage;
    isMobile ? videoSrc =  VIDEO_MARCOS['mobileVideoUrl'] : videoSrc =  VIDEO_MARCOS['videoUrl'];
    isMobile ? posterImage = VIDEO_MARCOS['mobilePosterImage'] : posterImage = VIDEO_MARCOS['videoPosterImage'];
    isMobile ? video[0].classList.add('creative__video--740') : null;

    video[0].poster = posterImage;
    video[0].src = videoSrc;

    video[0].load();
    video[0].play();


    onViewport(({ height }) => {
        // That's it, the video has only played once so we don't need
        // to listen anymore
        if( played ) {
            return false;
        }

        if( !onScrolling ) {
            onScrolling = true;
            onScroll(({ top, bottom }) => {
                if( played ) {
                    return false;
                }

                inView = top >= 0 && bottom <= height;
                if (!isUpdating) {
                    isUpdating = true;
                    updateVideo();
                    write(updateView);
                }
            });
        }
    });

    function updateView() {
        isUpdating = false;
    }

    // If the slot goes out of view, we pause the video
    function updateVideo() {
        if (inView) {
            video.play();
        } else {
            video.pause();
        }
    }
});
