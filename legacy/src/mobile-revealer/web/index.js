import { getIframeId, sendMessage, onViewport, resizeIframeHeight } from '../../_shared/js/messages.js';

const updateBackground = ({ height }) => {
    const [ scrollType,
        backgroundColour,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        transform ] = [
        'fixed',
        '#f6f6f6',
        `url('[%BackgroundImage%]')`,
        'no-repeat',
        'center center',
        'cover',
        'translate3d(0,0,0)'
    ];

    // for the height, we need to account for the height of the location bar, which
    // may or may not be there. 70px padding is not too much.
    sendMessage('background', {
        scrollType,
        backgroundColour,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        height: `${height + 70}px`,
        transform
    });
};

getIframeId()
.then(() => resizeIframeHeight())
.then(() => {
    onViewport(updateBackground);
});
