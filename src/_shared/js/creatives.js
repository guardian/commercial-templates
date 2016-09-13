export function cleanupButtons() {
    const moreTexts = ['[%Offer1LinkText%]', '[%Offer2LinkText%]', '[%Offer3LinkText%]', '[%Offer4LinkText%]'];
    const mores = Array.from(document.getElementsByClassName('advert__more'))
    .filter((more, index) => !moreTexts[index]);

    return write(() => {
        mores.forEach(more => more.parentNode.removeChild(more));
    })
}
