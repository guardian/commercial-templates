import { getIframeId, onViewport, onScroll, sendMessage, resizeIframeHeight, reportClicks } from '../../_shared/js/messages.js';
import { write } from '../../_shared/js/dom.js';

let layer2 = document.getElementById('layer2');
let linkDesktop = document.getElementById('linkDesktop');

const VIDEO_MARCOS = {
    'videoUrl': '[%VideoURL%]',
    'videoPosterImage': '[%VideoBackupImage%]',
    'mobileVideoUrl': '[%VideoURLMobile%]',
    'mobilePosterImage': '[%MobileVideoBackupImage%]',
}

getIframeId()
.then(() => {
    reportClicks();
    handleResize();

    const isMobile = window.matchMedia('(max-width: 739px)').matches;
    const isTablet = window.matchMedia('(min-width: 740px) and (max-width: 979px)').matches;
    handleBackground(isMobile, isTablet);

    let isUpdating = false;

    // We want to know when the slot is in view so we can control the video
    // and animation
    let inView = false;

    // We'll need an onScroll listener that will be add inside onViewport,
    // but since onViewport can fire multiple times, we want to make sure
    // the onScroll listener is added only once.
    let onScrolling = false;

    const video = document.querySelectorAll('video');

    console.log(video)

    let played = false; 
    isMobile ? video[1].onended = () => played = true : video[0].onended = () => played = true ;

    const videoSrc = isMobile ? VIDEO_MARCOS['mobileVideoUrl'] : VIDEO_MARCOS['videoUrl'];
    const  posterImage = isMobile ? VIDEO_MARCOS['mobilePosterImage'] : VIDEO_MARCOS['videoPosterImage'];

    isMobile ? video[1].poster = posterImage : video[0].poster = posterImage ;
    isMobile ? video[1].src = videoSrc : video[0].src = videoSrc;

    isMobile ? video[1].load() : video[0].load();
    isMobile ? video[1].play() : video[0].play()

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
            isMobile ? video[1].play() : video[0].play();
        } else {
            isMobile ? video[1].pause() : video[0].pause();
        }
    }

function handleBackground(isMobile, isTablet) {
    let scrollType = '[%BackgroundScrollType%]';
    let backgroundColour = '[%BackgroundColour%]';
    let [ backgroundImage, backgroundPosition, backgroundRepeat, creativeLink ] = isMobile ?
        ['[%MobileBackgroundImage%]', '[%MobileBackgroundImagePosition%]', '[%MobileBackgroundImageRepeat%]', document.getElementById('linkMobile')] :
        ['[%BackgroundImage%]', '[%BackgroundImagePosition%]', '[%BackgroundImageRepeat%]', document.getElementById('linkDesktop')];
    
        handlePadding(scrollType);

    if (backgroundColour) {
      document.documentElement.style.backgroundColor = backgroundColour;
    }

    if( !backgroundImage ) return;
    if( scrollType === 'none' ) {
        write(() => {
            Object.assign(creativeLink.style, {
                backgroundImage: `url('${backgroundImage}')`,
                backgroundPosition,
                backgroundRepeat
            })
        });
    } else {
        sendMessage('background', {
            scrollType: scrollType === 'parallax' && (isMobile || isTablet) ? 'fixed' : scrollType,
            backgroundColour,
            backgroundImage: `url('${backgroundImage}')`,
            backgroundRepeat,
            backgroundPosition
        });
    }
}

function handlePadding(scrollType) {
    if (scrollType === 'parallax') {
        linkDesktop !== undefined ? linkDesktop.classList.add('is-parallax') : ''; 
    }
}


function handleResize() {
    resizeIframeHeight(500);
}

});

