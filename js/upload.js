'use strict';

const main = document.querySelector(`main`);
const imgForm = main.querySelector(`.img-upload__form`);
const getMessageForm = (status) => {
  window.closeEditForm();
  const messageTemplate = document.querySelector(`#${status}`).content;
  const newMessageElement = messageTemplate.cloneNode(true);
  const closeMessageBtn = newMessageElement.querySelector(`.${status}__button`);
  main.insertBefore(newMessageElement, main.children[0]);
  const messageElement = main.querySelector(`.${status}`);
  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener(`keydown`, onDocumentKeydownEscCloseMessage);
    closeMessageBtn.removeEventListener(`click`, onCloseMessageBtnClick);
    main.removeEventListener(`click`, onMainClickCloseMessage);
  };
  const onDocumentKeydownEscCloseMessage = (evt) => {
    window.util.isEscEvent(evt, closeMessage);
  };
  const onCloseMessageBtnClick = () => {
    closeMessage();
  };
  const onMainClickCloseMessage = (evt) => {
    if (evt.target === messageElement) {
      closeMessage();
    }
  };
  closeMessageBtn.addEventListener(`click`, onCloseMessageBtnClick);
  document.addEventListener(`keydown`, onDocumentKeydownEscCloseMessage);
  main.addEventListener(`click`, onMainClickCloseMessage);
};

const successHandler = () => {
  getMessageForm(`success`);
};
const errorHandler = () => {
  getMessageForm(`error`);
};
window.submitHandler = (evt) => {
  window.backend.save(new FormData(imgForm), successHandler, errorHandler);
  evt.preventDefault();
};
