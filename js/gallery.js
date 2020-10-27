'use strict';

const pictureElement = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content;
const imgFiltersContainer = document.querySelector(`.img-filters`);
const filterForm = imgFiltersContainer.querySelector(`.img-filters__form`);
const filterButtons = filterForm.querySelectorAll(`.img-filters__button`);
const filterDefaultBtn = filterForm.querySelector(`#filter-default`);
const filterRandomBtn = filterForm.querySelector(`#filter-random`);
const filterDiscussedBtn = filterForm.querySelector(`#filter-discussed`);
const renderPicture = (picture) => {
  const newPictureElement = pictureTemplate.cloneNode(true);
  newPictureElement.querySelector(`.picture__img`).src = picture.url;
  newPictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  newPictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;
  return newPictureElement;
};
const render = (pictures) => {
  const displayedPictures = pictureElement.querySelectorAll(`.picture`);
  Array.from(displayedPictures).forEach((it) => pictureElement.removeChild(it));
  const picturesFragment = document.createDocumentFragment();
  pictures.forEach((it) => picturesFragment.appendChild(renderPicture(it)));
  pictureElement.appendChild(picturesFragment);
};
const givesPictures = (pictureObjects) => {
  render(pictureObjects);
  const pictures = pictureElement.querySelectorAll(`.picture`);
  Array.from(pictures).forEach((it, i) => window.getBigPicture(it, pictureObjects[i]));
};
const setFilterBtnClass = (filterBtn) => {
  Array.from(filterButtons).forEach((it) => it.classList.remove(`img-filters__button--active`));
  filterBtn.classList.add(`img-filters__button--active`);
};
const updateGallery = window.util.debounce((evt) => {
  let currentPictureObjects;
  switch (evt.target) {
    case filterDefaultBtn:
      currentPictureObjects = pictureObjects;
      break;
    case filterRandomBtn:
      currentPictureObjects = window.filter.getRandomPictureObjects(pictureObjects);
      break;
    case filterDiscussedBtn:
      currentPictureObjects = window.filter.getDiscussedPictureObjects(pictureObjects);
      break;
  }
  givesPictures(currentPictureObjects);
});
const onFilterFormClick = (evt) => {
  updateGallery(evt);
  setFilterBtnClass(evt.target);
};
let pictureObjects = [];
const successHandler = (data) => {
  pictureObjects = data;
  imgFiltersContainer.classList.remove(`img-filters--inactive`);
  givesPictures(pictureObjects);
  filterForm.addEventListener(`click`, onFilterFormClick);
};
const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; font-size: 30px;`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};
window.backend.load(successHandler, errorHandler);
