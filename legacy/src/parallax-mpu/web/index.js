import { getIframeId, sendMessage, onViewport } from '../../_shared/js/messages.js';
import { once } from '../../_shared/js/utils';

const updateBackground = ({ height }) => {
    const [ scrollType,
        backgroundColour,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        transform] = [
        'parallax',
        '#f6f6f6',
        `url('[%BackgroundImage%]')`,
        'repeat-y',
        'center center',
        'cover',
        'translate3d(0,0,0)'
    ];

    sendMessage('background', {
        scrollType,
        backgroundColour,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        height,
        transform
    });
};

getIframeId()
.then(() => {
    onViewport(once(updateBackground));
});
