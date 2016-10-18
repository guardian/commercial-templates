import { getIframeId, onScroll, onViewport } from '../_shared/js/messages';
import { write } from '../_shared/js/dom';

getIframeId()
.then(() => {
    let isUpdating = false;

    // We want to know when the slot is in view so we can control the video
    // and animation
    let inView = false;

    // This layer has a CSS animation which we want to pause in case the slot
    // goes out of view
    let layer2 = Array.from(document.getElementsByClassName('creative__layer2'));


    // We'll need an onScroll listener that will be add inside onViewport,
    // but since onViewport can fire multiple times, we want to make sure
    // the onScroll listener is added only once.
    let onScrolling = false;

    // We'll start the video when the slot is in view, but we want this
    // process to happen only once. When the video ends, we let everyone
    // know about it.
    let video = document.getElementsByTagName('video')[0];
    let played = false;
    video.onended = () => played = true;

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

                inView = top >= 0 && bottom < height;
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
        updateAnimation();
    }

    // If the slot goes out of view, we pause the video
    function updateVideo() {
        if (inView) {
            video.play();
        } else {
            video.pause();
        }
    }

    // If the slot goes out of view, we pause the animation
    function updateAnimation() {
        if (inView) {
            playAnimation();
        } else {
            pauseAnimation();
        }
    }

    function playAnimation() {
        layer2.forEach(function (l) { l.classList.add('is-animating'); });
    }

    function pauseAnimation() {
        layer2.forEach(function (l) { l.classList.remove('is-animating'); });
    }

});
