import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalLightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = modalLightboxRef.querySelector(".lightbox__image");

galleryRef.addEventListener("click", onModalLightboxOpen);
modalLightboxRef.addEventListener("click", onModalLightboxClose);
window.addEventListener("keydown", onModalLightboxClose);

function makeGalleryItemMurkup(items) {
  return items.map(({ original, preview, description }) => {
    const galleryItemEl = document.createElement("li");
    galleryItemEl.classList.add("gallery__item");

    const galleryLinkEl = document.createElement("link");
    galleryLinkEl.classList.add("gallery__link");
    galleryLinkEl.href = original;

    const galleryImageEl = document.createElement("img");
    galleryImageEl.classList.add("gallery__image");
    galleryImageEl.src = preview;
    galleryImageEl.setAttribute("data-source", original);
    galleryImageEl.alt = description;

    galleryLinkEl.appendChild(galleryImageEl);
    galleryItemEl.appendChild(galleryLinkEl);

    return galleryItemEl;
  });
}

function makeGalleryItemsEls(items) {
  const galleryItemsEls = makeGalleryItemMurkup(items);
  galleryRef.append(...galleryItemsEls);
}

makeGalleryItemsEls(galleryItems);

function onModalLightboxOpen(e) {
  e.preventDefault();

  if (e.target.classList.contains("gallery__image")) {
    modalLightboxRef.classList.add("is-open");
    lightboxImageRef.src = e.target.dataset.source;
    lightboxImageRef.alt = e.target.alt;
    console.log(lightboxImageRef.src);
  }
}

function onModalLightboxClose(e) {
  if (
    e.target.dataset.action === "close-lightbox" ||
    e.target.classList.contains("lightbox__overlay") ||
    e.key === "Escape"
  ) {
    modalLightboxRef.classList.remove("is-open");
    lightboxImageRef.src = "";
    lightboxImageRef.alt = "";
  }
}
