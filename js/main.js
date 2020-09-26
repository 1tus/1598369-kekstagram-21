'use strict';

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const PICTURE_ARR_LENGHT = 25;
const MIN_COMMENTS = 1;
const MAX_COMMMENTS = 7;

const pictureElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getRandomInt = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const getRandomArrElement = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const getNewComment = () => {
  return {
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrElement(MESSAGES),
    name: getRandomArrElement(NAMES)
  };
};

const getRandomCommentArr = (arrSize) => {
  const commentArr = [];
  for (let i = 0; i < arrSize; i++) {
    commentArr[i] = getNewComment();
  }
  return commentArr;
};

const getNewPictureObject = (pictureIndex) => {
  return {
    url: `photos/${pictureIndex}.jpg`,
    description: 'описание фотографии',
    likes: getRandomInt(15, 200),
    comments: getRandomCommentArr(getRandomInt(MIN_COMMENTS, MAX_COMMMENTS))
  };
};

const pictureObjects = [];
for (let i = 0; i < PICTURE_ARR_LENGHT; i++) {
  pictureObjects[i] = getNewPictureObject(i + 1);
}

const renderPicture = (picture) => {
  const newPictureElement = pictureTemplate.cloneNode(true);

  newPictureElement.querySelector('.picture__img').src = picture.url;
  newPictureElement.querySelector('.picture__likes').textContent = picture.likes;
  newPictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return newPictureElement;
};

const picturesFragment = document.createDocumentFragment();

for (let i = 0; i < pictureObjects.length; i++) {
  picturesFragment.appendChild(renderPicture(pictureObjects[i]));
}
pictureElement.appendChild(picturesFragment);

// больше деталей (часть 2)

document.querySelector('.big-picture').classList.remove('hidden');
const bigPictureImgContainer = document.querySelector('.big-picture__img');
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.children;
const commentTemplate = socialComments.querySelector('.social__comment');

for (let i = socialComment.length - 1; i >= 0; i--) {
  socialComment[i].remove();
}

bigPictureImgContainer.querySelector('img').src = pictureObjects[0].url;
document.querySelector('.likes-count').textContent = pictureObjects[0].likes;
document.querySelector('.comments-count').textContent = pictureObjects[0].comments.length;

const renderComment = (comment) => {
  const newCommentElement = commentTemplate.cloneNode(true);

  newCommentElement.querySelector('img').src = comment.avatar;
  newCommentElement.querySelector('img').alt = comment.name;
  newCommentElement.querySelector('.social__text').textContent = comment.message;

  return newCommentElement;
};

const commentsFragment = document.createDocumentFragment();
for (let i = 0; i < pictureObjects[0].comments.length; i++) {
  commentsFragment.appendChild(renderComment(pictureObjects[0].comments[i]));
}
socialComments.appendChild(commentsFragment);

document.querySelector('.social__caption').textContent = pictureObjects[0].description;

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
