import capiMultiple from '../../_shared/js/capi-multiple.js';
import addColourContrastClass from '../../_shared/js/hosted-colours.js';


const OVERRIDES = {
    kickers: ['[%Article1Kicker%]', '[%Article2Kicker%]', '[%Article3Kicker%]', '[%Article4Kicker%]']
};

// Constructs the kicker text
function buildKicker (card, cardNumber) {

    let kicker = card.querySelector('.advert__kicker');
    let kickerText = OVERRIDES.kickers[cardNumber];

    if(kicker && kickerText){
        kicker.textContent = kickerText + " / ";
    }
}

capiMultiple("hosted", buildKicker)
    .then(() => addColourContrastClass());
