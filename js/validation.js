'use strict';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASTAGS_COUNT = 5;
const inputHashtags = document.querySelector(`.text__hashtags`);
const inputComment = document.querySelector(`.text__description`);
const styleInvalid = `border: 4px solid red;`;
const styleValid = `border: none;`;

window.validation = {
  getHastags: () => {
    const hashtags = inputHashtags.value.toLowerCase().split(` `).filter((it) => it !== ``);
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

    if (hashtags.length > MAX_HASTAGS_COUNT) {
      inputHashtags.setCustomValidity(`Максимально допустимо ${MAX_HASTAGS_COUNT} хэштегов`);
      inputHashtags.style = styleInvalid;
    } else if (!hashtags.every(testPattern)) {
      inputHashtags.setCustomValidity(`Недопустимый формат хэштега`);
      inputHashtags.style = styleInvalid;
    } else if (checkMacthingHashtags()) {
      inputHashtags.setCustomValidity(`Недопустимы повторы хэштегов`);
      inputHashtags.style = styleInvalid;
    } else {
      inputHashtags.setCustomValidity(``);
      inputHashtags.style = styleValid;
    }
    inputHashtags.reportValidity();
  },

  getComment: () => {
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
