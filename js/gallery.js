'use strict';

(function () {
  const pictureElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const renderPicture = (picture) => {
    const newPictureElement = pictureTemplate.cloneNode(true);

    newPictureElement.querySelector('.picture__img').src = picture.url;
    newPictureElement.querySelector('.picture__likes').textContent = picture.likes;
    newPictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return newPictureElement;
  };

  const picturesFragment = document.createDocumentFragment();

  for (let i = 0; i < window.pictureObjects.length; i++) {
    picturesFragment.appendChild(renderPicture(window.pictureObjects[i]));
  }
  pictureElement.appendChild(picturesFragment);

})();
