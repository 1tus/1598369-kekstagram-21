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
  const successHandler = (pictureObjects) => {
    const picturesFragment = document.createDocumentFragment();
    for (let i = 0; i < pictureObjects.length; i++) {
      picturesFragment.appendChild(renderPicture(pictureObjects[i]));
    }
    pictureElement.appendChild(picturesFragment);
    const pictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < pictures.length; i++) {
      window.getFullPicture(pictures[i], pictureObjects[i]);
    }
  };
  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.load(successHandler, errorHandler);
})();
