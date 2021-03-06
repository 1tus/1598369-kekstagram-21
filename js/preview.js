'use strict';

const MAX_EFFECT_PERCENT = 100;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const FILTER_EFFECTS = {
  none: {
    min: 0,
    max: 0,
    getStyle: () => ``
  },
  chrome: {
    min: 0,
    max: 1,
    getStyle: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    getStyle: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    getStyle: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    getStyle: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    getStyle: (value) => `brightness(${value})`
  }
};
const ZOOM = {
  min: 25,
  max: 100,
  step: 25,
  current: 100,
  getStyle: (size) => `transform: scale(${size / 100})`
};

const uploadFileField = document.querySelector(`.img-upload__start`);
const inputFile = uploadFileField.querySelector(`.img-upload__input`);
const imgForm = document.querySelector(`.img-upload__form`);
const imgFormPreview = imgForm.querySelector(`.img-upload__overlay`);
const imgPreview = imgFormPreview.querySelector(`.img-upload__preview > img`);
const closeEditFormBtn = imgFormPreview.querySelector(`.img-upload__cancel`);
const inputHashtags = imgFormPreview.querySelector(`.text__hashtags`);
const inputDescription = imgFormPreview.querySelector(`.text__description`);
const effectsBar = imgFormPreview.querySelector(`.img-upload__effects`);
const effectPreviews = effectsBar.querySelectorAll(`.effects__preview`);
const effectInputNone = effectsBar.querySelector(`#effect-none`);
const zoomDownBtn = imgFormPreview.querySelector(`.scale__control--smaller`);
const zoomUpBtn = imgFormPreview.querySelector(`.scale__control--bigger`);
const selectedZoom = imgFormPreview.querySelector(`.scale__control--value`);
const effectField = document.querySelector(`.img-upload__effect-level`);
const effectPin = effectField.querySelector(`.effect-level__pin`);
const effectPinValue = effectField.querySelector(`.effect-level__value`);
const effectLevelDepth = effectField.querySelector(`.effect-level__depth`);

const setZoomStyle = (size) => {
  selectedZoom.value = `${size}%`;
  imgPreview.style = ZOOM.getStyle(size);
  if (size === ZOOM.max) {
    zoomUpBtn.disabled = true;
  }
  if (size === ZOOM.min) {
    zoomDownBtn.disabled = true;
  }
};
const onZoomDownBtnClick = () => {
  ZOOM.current = ZOOM.current - ZOOM.step;
  setZoomStyle(ZOOM.current);
  if (ZOOM.current < ZOOM.max) {
    zoomUpBtn.disabled = false;
  }
};
const onZoomUpBtnClick = () => {
  ZOOM.current = ZOOM.current + ZOOM.step;
  setZoomStyle(ZOOM.current);
  if (ZOOM.current > ZOOM.min) {
    zoomDownBtn.disabled = false;
  }
};
const insertImagePreview = (file) => {
  const fileName = file.name.toLowerCase();
  const isRequiredType = FILE_TYPES.some((fileType) => {
    return fileName.endsWith(fileType);
  });
  if (isRequiredType) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      imgPreview.src = reader.result;
      Array.from(effectPreviews).forEach((it) => {
        it.style = `background-image: url(${reader.result})`;
      });
    });
    reader.readAsDataURL(file);
  }
};
const getEffectValue = (effectName, value) => {
  const filterEffect = FILTER_EFFECTS[effectName];
  return filterEffect.min + (filterEffect.max - filterEffect.min) / MAX_EFFECT_PERCENT * value;
};
const setFilterEffect = (effectName) => {
  const effectValue = getEffectValue(effectName, effectPinValue.value);
  imgPreview.style.filter = FILTER_EFFECTS[effectName].getStyle(effectValue);
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
  effectPin.style.left = `${MAX_EFFECT_PERCENT}%`;
  effectLevelDepth.style.width = `${MAX_EFFECT_PERCENT}%`;
  if (imgPreview.classList.contains(`effects__preview--none`)) {
    effectField.style.display = `none`;
    effectPinValue.value = ``;
  } else {
    effectField.style.display = `block`;
    effectPinValue.value = MAX_EFFECT_PERCENT;
  }
  imgPreview.style.filter = FILTER_EFFECTS[currentEffect].getStyle(FILTER_EFFECTS[currentEffect].max);
  effectPin.addEventListener(`mouseup`, onEffectPinMouseUp);
  return currentEffect;
};
const onEffectPinMouseUp = () => {
  setFilterEffect(currentEffect);
};

const resetEditForm = () => {
  inputFile.value = ``;
  imgPreview.className = ``;
  imgPreview.style.filter = ``;
  inputHashtags.value = ``;
  inputDescription.value = ``;
  effectInputNone.checked = `true`;
  effectPinValue.value = ``;
  ZOOM.current = ZOOM.max;
  zoomDownBtn.disabled = false;
  imgPreview.src = `#`;
};
const onUploadFileFieldChange = () => {
  imgFormPreview.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  closeEditFormBtn.addEventListener(`click`, onCloseEditFormBtnClick);
  document.addEventListener(`keydown`, onDocumentKeydownEscCloseEditForm);
  effectsBar.addEventListener(`input`, setTargetEffect);
  inputHashtags.addEventListener(`input`, window.validation.getHastags);
  inputDescription.addEventListener(`input`, window.validation.getComment);
  insertImagePreview(inputFile.files[0]);
  setZoomStyle(ZOOM.current);
  effectField.style.display = `none`;
  zoomDownBtn.addEventListener(`click`, onZoomDownBtnClick);
  zoomUpBtn.addEventListener(`click`, onZoomUpBtnClick);
  imgForm.addEventListener(`submit`, window.submitHandler);
};

uploadFileField.addEventListener(`change`, onUploadFileFieldChange);

const onCloseEditFormBtnClick = () => {
  imgFormPreview.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  resetEditForm();
  closeEditFormBtn.removeEventListener(`click`, onCloseEditFormBtnClick);
  document.removeEventListener(`keydown`, onDocumentKeydownEscCloseEditForm);
  effectsBar.removeEventListener(`input`, setTargetEffect);
  effectPin.removeEventListener(`mouseup`, onEffectPinMouseUp);
  inputHashtags.removeEventListener(`input`, window.validation.getHastags);
  inputDescription.removeEventListener(`input`, window.validation.getComment);
  zoomDownBtn.removeEventListener(`click`, onZoomDownBtnClick);
  zoomUpBtn.removeEventListener(`click`, onZoomUpBtnClick);
  imgForm.removeEventListener(`submit`, window.submitHandler);
};
window.closeEditForm = onCloseEditFormBtnClick;

const onDocumentKeydownEscCloseEditForm = (evt) => {
  if (document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
    window.util.isEscEvent(evt, window.closeEditForm);
  }
};
