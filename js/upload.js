'use strict';

(function () {
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
      document.removeEventListener(`keydown`, onCloseMessageEsc);
      closeMessageBtn.removeEventListener(`click`, onCloseMessageBtn);
      main.removeEventListener(`click`, onCloseMessageClick);
    };
    const onCloseMessageEsc = (evt) => {
      if (evt.key === `Escape`) {
        closeMessage();
      }
    };
    const onCloseMessageBtn = () => {
      closeMessage();
    };
    const onCloseMessageClick = (evt) => {
      if (evt.target === messageElement) {
        closeMessage();
      }
    };
    closeMessageBtn.addEventListener(`click`, onCloseMessageBtn);
    document.addEventListener(`keydown`, onCloseMessageEsc);
    main.addEventListener(`click`, onCloseMessageClick);
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
})();
