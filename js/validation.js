'use strict';

const MAX_COMMENT_LENGTH = 140;
const inputHashtags = document.querySelector(`.text__hashtags`);
const inputComment = document.querySelector(`.text__description`);
const styleInvalid = `border: 4px solid red;`;
const styleValid = `border: none;`;

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
      inputHashtags.style = styleInvalid;
    } else if (!hashtags.every(testPattern) && hashtags[0] !== ``) {
      inputHashtags.setCustomValidity(`Недопустимый формат хэштега`);
      inputHashtags.style = styleInvalid;
    } else if (checkMacthingHashtags() && hashtags[0] !== ``) {
      inputHashtags.setCustomValidity(`Недопустимы повторы хэштегов`);
      inputHashtags.style = styleInvalid;
    } else {
      inputHashtags.setCustomValidity(``);
      inputHashtags.style = styleValid;
    }
    inputHashtags.reportValidity();
  },

  getCommentValidation: () => {
    const valueLength = inputComment.value.length;
    if (valueLength > MAX_COMMENT_LENGTH) {
      inputComment.setCustomValidity(`Удалите лишние ${valueLength - MAX_COMMENT_LENGTH} симв.`);
      inputComment.style = styleInvalid;
    } else {
      inputComment.setCustomValidity(``);
      inputComment.style = styleValid;
    }
    inputComment.reportValidity();
  }
};
