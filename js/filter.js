'use strict';

const RANDOM_PICTURE_OBJECTS_LENGTH = 10;
const getRandomInt = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};
const getRandomPictureObjects = (pictureObjects) => {
  let randomPictureObjects = [];
  let pictureObjectsCopy = pictureObjects.slice();
  for (let i = 0; i < RANDOM_PICTURE_OBJECTS_LENGTH; i++) {
    let randomIndex = getRandomInt(0, pictureObjectsCopy.length - 1);
    randomPictureObjects.push(pictureObjectsCopy[randomIndex]);
    pictureObjectsCopy.splice(randomIndex, 1);
  }
  return randomPictureObjects;
};
const getDiscussedPictureObjects = (pictureObjects) => {
  return pictureObjects.slice().sort((left, right) => right.comments.length - left.comments.length);
};
window.filter = {
  getRandomPictureObjects,
  getDiscussedPictureObjects
};
