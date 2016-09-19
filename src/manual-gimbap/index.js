Array.from(document.getElementsByClassName('gimbap__title'), (title) => {
	title.insertAdjacentHtml('afterbegin', quoteSvg);
});

var offerTones = ['[%Offer1Tone%]', '[%Offer2Tone%]', '[%Offer3Tone%]', '[%Offer4Tone%]'];

Array.from(document.getElementsByClassName('gimbap-logo'), (logo, idx) => {
	logo.insertAdjacentHtml('afterbegin', logoSvgs[offerTones[idx]]);
});
