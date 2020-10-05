'use strict';

(function () {
  const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  const PICTURE_ARR_LENGHT = 25;
  const MIN_COMMENTS = 1;
  const MAX_COMMMENTS = 7;

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

  window.pictureObjects = pictureObjects;

})();