import { write } from './dom.js';

function isDark(hex) {
    let colour = (hex.charAt(0) == '#') ? hex.substring(1, 7) : hex;
    let R = parseInt(colour.substring(0, 2), 16);
    let G = parseInt(colour.substring(2, 4), 16);
    let B = parseInt(colour.substring(4, 6), 16);

    let min = Math.min(R, G, B);
    let max = Math.max(R, G, B);
    let lightness = (min + max) / 510;
    return lightness <= 0.5;
}

export default function addColourContrastClass () {
    let div = document.getElementsByClassName('creative')[0];
    let brandColour = div.getAttribute('data-brand-color');
    if(isDark(brandColour)){
        return write(() => {
            div.classList.add('hosted-bright')
        });
    }
    return Promise.resolve();
}