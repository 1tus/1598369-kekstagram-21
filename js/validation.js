'use strict';

const MAX_COMMENT_LENGTH = 140;
const inputHashtags = document.querySelector(`.text__hashtags`);
const inputComment = document.querySelector(`.text__description`);
window.validation = {
  getHastagsValidation: () => {
    const hashtags = inputHashtags.value.split(` `);
    const testPattern = (hastag) => {
      const pattern = /^#[А-Яа-яЁёA-Za-z\d]{1,19}$/;
      return pattern.test(hastag);
    };
    const checkMacthingHashtags = () => {
      let hashtagsCopy = hashtags.slice();
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

    if (hashtags.length > 5 && hashtags[0] !== ``) {
      inputHashtags.setCustomValidity(`Максимально допустимо 5 хэштегов`);
    } else if (!hashtags.every(testPattern) && hashtags[0] !== ``) {
      inputHashtags.setCustomValidity(`Недопустимый формат хэштега`);
    } else if (checkMacthingHashtags() && hashtags[0] !== ``) {
      inputHashtags.setCustomValidity(`Недопустимы повторы хэштегов`);
    } else {
      inputHashtags.setCustomValidity(``);
    }
    inputHashtags.reportValidity();
  },

  getCommentValidation: () => {
    const valueLength = inputComment.value.length;
    if (valueLength > MAX_COMMENT_LENGTH) {
      inputComment.setCustomValidity(`Удалите лишние ${valueLength - MAX_COMMENT_LENGTH} симв.`);
    } else {
      inputComment.setCustomValidity(``);
    }
    inputComment.reportValidity();
  }
};
