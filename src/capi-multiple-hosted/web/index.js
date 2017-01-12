import capiMultiple from '../../_shared/js/capi-multiple.js';
import addColourContrastClass from '../../_shared/js/hosted-colours.js';

capiMultiple("hosted")
    .then(() => addColourContrastClass());
