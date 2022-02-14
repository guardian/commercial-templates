import {
  getIframeId,
  getWebfonts,
  resizeIframeHeight,
  onViewport,
  reportClicks
} from "./messages.js";
import { write } from "./dom.js";
import { enableToggles } from "./ui.js";
import { generatePicture } from "./capi-images.js";
import { clickMacro, setEditionLink } from "./ads";
import { hideOnError, URLSearchParams } from "./utils";

const ENDPOINTS = {
  live: "https://membership.theguardian.com/events.json",
  masterclass: "https://membership.theguardian.com/masterclasses.json"
};

const OVERRIDES = {
  urls: ["[%Offer1URL%]", "[%Offer2URL%]", "[%Offer3URL%]", "[%Offer4URL%]"],
  metas: [
    "[%Offer1Meta%]",
    "[%Offer2Meta%]",
    "[%Offer3Meta%]",
    "[%Offer4Meta%]"
  ],
  headlines: [
    "[%Offer1Title%]",
    "[%Offer2Title%]",
    "[%Offer3Title%]",
    "[%Offer4Title%]"
  ],
  images: [
    "[%Offer1Image%]",
    "[%Offer2Image%]",
    "[%Offer3Image%]",
    "[%Offer4Image%]"
  ]
};

const getEventsData = ENDPOINT => {
  return fetch(`${ENDPOINT}`)
    .then(response => response.json())
    .then(json => json.events.filter(f => OVERRIDES.urls.includes(f.url)));
};

// Either from template, or workaround for IE (sigh).
function importCard(adType) {
  const cardTemplate = document.getElementById(`${adType}-card`);

  // Modern browsers.
  if (cardTemplate.content) {
    return document.importNode(cardTemplate.content, true);
  } else {
    // Internet Explorer doesn't support templates.
    const cardFragment = document.createDocumentFragment();
    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = cardTemplate.innerHTML;
    while (tempDiv.firstChild) cardFragment.appendChild(tempDiv.firstChild);
    return cardFragment;
  }
}

const boldTitle = title => {
  return title.split(":")[1]
    ? `<b>${title.split(":")[0]}:</b>${title.split(":")[1]}`
    : `<b>${title}</b>`;
};

// Constructs the title part of the card: headline and media icon.
function buildTitle(card, cardInfo, cardNumber) {
  let title = card.querySelector(".advert__title");
  let meta = card.querySelector(".advert__meta");
  let metaText = OVERRIDES.metas[cardNumber];

  let headline = OVERRIDES.headlines[cardNumber] || boldTitle(cardInfo.title);
  card.classList.add("advert--text");

  card.setAttribute("data-link-name", headline);

  title.insertAdjacentHTML("beforeend", headline);
  meta.insertAdjacentHTML("beforeend", metaText || "");
}

function injectBranchLogo() {
  let componentTone = "[%Tone%]";

  Array.from(document.getElementsByClassName("brand_logo")).forEach(
    insertHeaderSvg
  );

  function insertHeaderSvg(div) {
    write(() => div.insertAdjacentHTML("afterbegin", logoSvgs[componentTone]));
  }
}

function buildClickthroughUrl(originalUrl) {
  const parsedUrl = new URL(originalUrl);
  parsedUrl.searchParams.set("INTCMP", "[%TrackingId%]");
  const clickthroughUrl = `${clickMacro}${parsedUrl.toString()}`;
  return clickthroughUrl;
}

// Constructs an individual card.
function buildCard(cardInfo, cardNum, adType, cardsInfo) {
  const cardFragment = importCard(adType);
  const card = cardFragment.querySelector(`.advert--${adType}`);
  const imgContainer = card.querySelector(".advert__image-container");
  const clickthroughUrl = buildClickthroughUrl(`${OVERRIDES.urls[cardNum]}`);
  card.href = clickthroughUrl;

  buildTitle(card, cardInfo, cardNum);
  const image = generatePicture({
    url: OVERRIDES.images[cardNum] || cardInfo.socialImageUrl,
    classes: ["advert__image"]
  });

  imgContainer.insertAdjacentHTML("afterbegin", image);

  if (cardNum > 1) {
    card.classList.add("hide-until-tablet");
  }

  return cardFragment;
}

// Uses API data to build the ad content.
function buildFromApi(host, cardsInfo, adType) {
  const cardList = document.createDocumentFragment();
  // Constructs an array of cards from an array of data.
  cardsInfo.forEach((info, idx) => {
    cardList.appendChild(buildCard(info, idx, adType, cardsInfo));
  });

  const adClickthrough = document.querySelector(".adverts__ctas a");
  adClickthrough.href = buildClickthroughUrl("[%TitleURL%]");

  return write(() => {
    // Takes branding from last possible card, in case earlier ones overridden.
    injectBranchLogo();
    let advertRow = document.querySelector(".adverts__row");
    advertRow.appendChild(cardList);
  });
}

export default function apiMultiple(adType) {
  let lastWidth;
  const ENDPOINT = ENDPOINTS[adType];

  enableToggles();

  return getIframeId()
    .then(({ host }) =>
      Promise.all([
        reportClicks(),
        getWebfonts(),
        getEventsData(ENDPOINT).then(apiData =>
          buildFromApi(host, apiData, adType)
        )
      ])
    )
    .then(() => {
      onViewport(({ width }) => {
        if (width != lastWidth) {
          resizeIframeHeight();
          lastWidth = width;
        }
      });
    })
    .catch(error => hideOnError(error, `events-multiple-${adType}`));
}
