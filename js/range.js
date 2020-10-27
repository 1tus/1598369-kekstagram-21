'use strict';

const effectField = document.querySelector(`.img-upload__effect-level`);
const effectLevelDepth = effectField.querySelector(`.effect-level__depth`);
const effectPin = effectField.querySelector(`.effect-level__pin`);
const effectPinValue = effectField.querySelector(`.effect-level__value`);

effectPin.addEventListener(`mousedown`, (evt) => {
  const pinLineWidth = effectField.querySelector(`.effect-level__line`).offsetWidth;
  let startCoord = evt.clientX;
  const onDocumentMouseMove = (moveEvt) => {
    const shift = startCoord - moveEvt.clientX;
    startCoord = moveEvt.clientX;
    let currentCoord = effectPin.offsetLeft - shift;
    if (currentCoord < 0) {
      currentCoord = 0;
    } else if (currentCoord > pinLineWidth) {
      currentCoord = pinLineWidth;
    }
    effectPin.style.left = `${currentCoord}px`;
    effectLevelDepth.style.width = `${currentCoord}px`;
    effectPinValue.value = Math.round(currentCoord * 100 / pinLineWidth);
  };
  const onDocumentMouseUp = () => {
    document.removeEventListener(`mousemove`, onDocumentMouseMove);
    document.removeEventListener(`mouseup`, onDocumentMouseUp);
  };
  document.addEventListener(`mousemove`, onDocumentMouseMove);
  document.addEventListener(`mouseup`, onDocumentMouseUp);
});
