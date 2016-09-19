import { ajaxCall } from '../_shared/js/ajax.js';

requestSoulmates('[%Subfeed%]')
  .catch( (error) => {throw new Error(error); })
  .then(JSON.parse)
  .catch( (error) => {throw new Error(error); })
  .then( (parsedSoulmates) => addSoulmateCards(parsedSoulmates));

function requestSoulmates(group) {
  ajaxCall('https://theguardian.com/commercial/soulmates/' + group + '.json');
};

function addSoulmateCards(soulmates) {
  /*
    We can use the nice <template> tag if it is supported:
    https://developer.mozilla.org/en/docs/Web/HTML/Element/template

    otherwise create it incrementally.
  */
  if (supportsTemplate) {
    generateWithTemplate();
  } else {
    generateWithoutTemplate();
  }

  function supportsTemplate (){
    return 'content' in document.createElement('template');
  }

  function generateWithTemplate() {
    let template = document.querySelector("#soulmate-card");
    let card_container = document.getElementByClassName("adverts_row");

    for (soulmate of soulmates) {

      // populate the template with the soulmate contents
      let container = template.querySelector("a");
      container.href = "%%CLICK_URL_ESC%%" + soulmate.profileUrl;
      container.setAttribute("data-link-name", "merchandising-soulmates-v2_2_2014-03-28-profile-" + soulmate.gender);

      template.querySelector("h2").textContent = soulmate.username;
      template.querySelector("img").src = soulmate.profilePhoto;
      template.querySelector(".advert__meta").textContent = soulmate.age + ", " + soulmate.location;

      // copy the template into the card container
      var clone = document.importNode(t.content, true);
      card_container.appendChild(clone);
    }
  }

  function generateWithoutTemplate() {
    for (soulmate of soulmates) {

      // create the elements separately
      let container = document.createElement("a");
      container.classList.add("advert", "advert--soulmate");
      container.href = "%%CLICK_URL_ESC%%" + soulmate.profileUrl;
      container.setAttribute("data-link-name", "merchandising-soulmates-v2_2_2014-03-28-profile-" + soulmate.gender);

      let heading = document.createElement("h2");
      heading.classList.add("advert__title", "u-text-hyphenate");
      heading.setAttribute("data-link-name", "merchandising-soulmates-v2_2_2014-03-28-profile-" + soulmate.gender);
      heading.setAttribute("itemprop", "name");
      heading.textContent = soulmate.username;

      let photo_container = document.createElement("div");
      photo_container.classList.add("advert__image-container");

      let photo = document.createElement("img");
      photo.classList.add("advert__image");
      photo.src = soulmate.profilePhoto;

      let location = document.createElement("div");
      location.classList.add("advert__meta");
      location.textContent = soulmate.age + ", " + soulmate.location;

      // add them to the dom
      container.appendChild(heading);
      container.appendChild(photo_container);
      photo_container.appendChild(photo);
      container.appendChild(location);
    }
  }
}
