import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalLightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = modalLightboxRef.querySelector(".lightbox__image");

galleryRef.addEventListener("click", onModalLightboxOpen);
modalLightboxRef.addEventListener("click", onModalLightboxClose);

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
  }

  window.addEventListener("keydown", onModalLightboxClose);
  window.addEventListener("keydown", switchImagesWithArrowKeys);
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

function switchImagesWithArrowKeys(e) {
  let imageIndex = galleryItems.findIndex(
    (item) => item.original === lightboxImageRef.src
  );

  if (e.code === "ArrowLeft") {
    imageIndex === 0
      ? (imageIndex = galleryItems.length - 1)
      : (imageIndex -= 1);
  }

  if (e.code === "ArrowRight") {
    imageIndex === galleryItems.length - 1
      ? (imageIndex = 0)
      : (imageIndex += 1);
  }

  lightboxImageRef.src = galleryItems[imageIndex].original;
  lightboxImageRef.alt = galleryItems[imageIndex].description;
}
