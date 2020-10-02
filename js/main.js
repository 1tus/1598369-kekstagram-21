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

// document.querySelector('.big-picture').classList.remove('hidden');
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
// document.querySelector('body').classList.add('modal-open');

// доверяй, но проверяй (часть 1)

const MAX_EFFECT_PERCENT = 100;
const FILTER_EFFECTS = {
  none: {
    min: 0,
    max: 0,
    getFilterStyle: () => ''
  },
  chrome: {
    min: 0,
    max: 1,
    getFilterStyle: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    getFilterStyle: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    getFilterStyle: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    getFilterStyle: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    getFilterStyle: (value) => `brightness(${value})`
  }
};
const ZOOM = {
  min: 25,
  max: 100,
  step: 25,
  current: 100,
  getZoomStyle: (size) => `transform: scale(${size / 100})`
};

const uploadFileField = document.querySelector('.img-upload__start');
const imgFormPreview = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview > img');
const effectPinValue = imgFormPreview.querySelector('.effect-level__value');
const closeEditFormBtn = imgFormPreview.querySelector('.img-upload__cancel');
const inputHashtags = imgFormPreview.querySelector('.text__hashtags');
const inputDescription = imgFormPreview.querySelector('.text__description');
const effectsBar = imgFormPreview.querySelector('.img-upload__effects');
const effectPin = imgFormPreview.querySelector('.effect-level__pin');
const zoomDownBtn = imgFormPreview.querySelector('.scale__control--smaller');
const zoomUpBtn = imgFormPreview.querySelector('.scale__control--bigger');
const selectedZoom = imgFormPreview.querySelector('.scale__control--value');

const setZoomStyle = (size) => {
  selectedZoom.value = `${size}%`;
  imgPreview.style = ZOOM.getZoomStyle(size);
  if (size === ZOOM.max) {
    zoomUpBtn.disabled = true;
  }
  if (size === ZOOM.min) {
    zoomDownBtn.disabled = true;
  }
};
const onZoomDownClick = () => {
  ZOOM.current = ZOOM.current - ZOOM.step;
  setZoomStyle(ZOOM.current);
  if (ZOOM.current < ZOOM.max) {
    zoomUpBtn.disabled = false;
  }
};
const onZoomUpClick = () => {
  ZOOM.current = ZOOM.current + ZOOM.step;
  setZoomStyle(ZOOM.current);
  if (ZOOM.current > ZOOM.min) {
    zoomDownBtn.disabled = false;
  }
};

const getEffectValue = (effectName, value) => {
  const filterEffect = FILTER_EFFECTS[effectName];
  return filterEffect.min + (filterEffect.max - filterEffect.min) / MAX_EFFECT_PERCENT * value;
};
const setFilterEffect = (effectName) => {
  const effectValue = getEffectValue(effectName, effectPinValue.value);
  imgPreview.style.filter = FILTER_EFFECTS[effectName].getFilterStyle(effectValue);
};

let filterClass;
const setFilterClass = (effectName) => {
  if (filterClass) {
    imgPreview.classList.remove(filterClass);
  }
  imgPreview.classList.add(`effects__preview--${effectName}`);
  filterClass = `effects__preview--${effectName}`;
};

let currentEffect;
const setTargetEffect = (evt) => {
  setFilterClass(evt.target.value);
  currentEffect = evt.target.value;
  imgPreview.style.filter = FILTER_EFFECTS[currentEffect].getFilterStyle(FILTER_EFFECTS[currentEffect].max);
  effectPin.addEventListener('mouseup', onEffectPinUp);
  return currentEffect;
};
const onEffectPinUp = () => {
  setFilterEffect(currentEffect);
};

const resetEditForm = () => {
  document.querySelector('#upload-file').value = '';
};
const onOpenEditForm = () => {
  openEditForm();
};
const openEditForm = () => {
  imgFormPreview.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeEditFormBtn.addEventListener('click', onCloseEditForm);
  document.addEventListener('keydown', onCloseEditFormEsc);
  effectsBar.addEventListener('input', setTargetEffect);
  inputHashtags.addEventListener('input', getHastagsValidation);
  ZOOM.current = ZOOM.max;
  zoomDownBtn.disabled = false;
  setZoomStyle(ZOOM.current);
  zoomDownBtn.addEventListener('click', onZoomDownClick);
  zoomUpBtn.addEventListener('click', onZoomUpClick);
};

uploadFileField.addEventListener('change', onOpenEditForm);

const onCloseEditForm = () => {
  closeEditForm();
};
const closeEditForm = () => {
  imgFormPreview.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetEditForm();
  closeEditFormBtn.removeEventListener('click', onCloseEditForm);
  document.removeEventListener('keydown', onCloseEditFormEsc);
  effectsBar.removeEventListener('input', setTargetEffect);
  effectPin.removeEventListener('mouseup', onEffectPinUp);
  inputHashtags.removeEventListener('input', getHastagsValidation);
  zoomDownBtn.removeEventListener('click', onZoomDownClick);
  zoomUpBtn.removeEventListener('click', onZoomUpClick);
};

const onCloseEditFormEsc = (evt) => {
  if (evt.keyCode === 27 && document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
    closeEditForm();
  }
};

const getHastagsValidation = () => {
  const hashtags = inputHashtags.value.split(' ');
  const testPattern = (hastag) => {
    const pattern = /^#[А-Яа-яЁёA-Za-z\d]{1,19}$/;
    return pattern.test(hastag);
  };
  const checkMacthingHashtags = () => {
    let hashtagsCopy = hashtags.slice(0);
    let element;
    let checkMacth;
    while (hashtagsCopy.length) {
      element = hashtagsCopy.shift();
      if (hashtagsCopy.indexOf(element) >= 0) {
        checkMacth = true;
      }
    }
    return checkMacth;
  };

  if (hashtags.length > 5 && hashtags[0] !== '') {
    inputHashtags.setCustomValidity('Максимольно допустимо 5 хэштегов');
  } else if (!hashtags.every(testPattern) && hashtags[0] !== '') {
    inputHashtags.setCustomValidity('Недопустимый формат хэштега');
  } else if (checkMacthingHashtags() && hashtags[0] !== '') {
    inputHashtags.setCustomValidity('Недопустимы повторы хэштегов');
  } else {
    inputHashtags.setCustomValidity('');
  }
  inputHashtags.reportValidity();
};
