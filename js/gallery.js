'use strict';

(function () {
  const pictureElement = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const renderPicture = (picture) => {
    const newPictureElement = pictureTemplate.cloneNode(true);

    newPictureElement.querySelector(`.picture__img`).src = picture.url;
    newPictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
    newPictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

    return newPictureElement;
  };
  window.load(function (pictureObjects) {
    const picturesFragment = document.createDocumentFragment();
    for (let i = 0; i < pictureObjects.length; i++) {
      picturesFragment.appendChild(renderPicture(pictureObjects[i]));
    }
    pictureElement.appendChild(picturesFragment);
    const pictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < pictures.length; i++) {
      window.getFullPicture(pictures[i], pictureObjects[i]);
    }
  });
})();
