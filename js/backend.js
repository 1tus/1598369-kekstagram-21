'use strict';

(function () {
  const TIMEOUT_IN_MS = 10000;
  const URL = `https://21.javascript.pages.academy/kekstagram`;
  const StatusCode = {
    OK: 200,
    INVALID_REQUEST: 400,
    NOT_LOGGED: 401,
    NOT_FOUND: 404
  };

  const getRequest = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.INVALID_REQUEST:
          onError(`Неверный запрос`);
          break;
        case StatusCode.NOT_LOGGED:
          onError(`Пользователь не авторизован`);
          break;
        case StatusCode.NOT_FOUND:
          onError(`Ничего не найдено`);
          break;
        default:
          onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };
  window.backend = {
    load: (onLoad, onError) => {
      const xhr = getRequest(onLoad, onError);
      xhr.open(`GET`, `${URL}/data`);
      xhr.send();
    },
    save: (data, onLoad, onError) => {
      const xhr = getRequest(onLoad, onError);
      xhr.open(`POST`, URL);
      xhr.send(data);
    }
  };
})();
