'use strict';

const DEBOUNCE_INTERVAL = 500;
window.util = {
  isEscEvent: (evt, action) => {
    if (evt.key === `Escape`) {
      action();
    }
  },
  debounce: (cb) => {
    let lastTimeout = null;
    return (...args) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        cb(...args);
      }, DEBOUNCE_INTERVAL);
    };
  }
};
