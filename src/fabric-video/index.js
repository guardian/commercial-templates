import { getIframeId, onScroll, onViewport } from '../_shared/js/messages';
import { write } from '../_shared/js/dom';

getIframeId()
.then(() => {
    let video = document.getElementsByTagName('video')[0];
    let layer2 = Array.from(document.getElementsByClassName('creative__layer2'));
    let inView = false;
    let isUpdating = false;
    let played = false;
    let onScrolling = false;

    video.onended = () => played = true;

    onViewport(({ height }) => {
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

    function updateVideo() {
        if (inView) {
            video.play();
        } else {
            video.pause();
        }
    }

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
