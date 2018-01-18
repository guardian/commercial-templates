import { write } from './dom.js';

export function cleanupButtons() {
    const moreTexts = ['[%OfferLinkText%]'];
    const mores = Array.from(document.getElementsByClassName('advert__more'))
        .filter((more, index) => !moreTexts[index]);

    return write(() => {
        mores.forEach(more => more.parentNode.removeChild(more));
    })
}
