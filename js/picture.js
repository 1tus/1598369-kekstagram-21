'use strict';

const SOCIAL_COMMENTS_BY_CLICK = 5;
const body = document.querySelector(`body`);
const bigPictureContainer = body.querySelector(`.big-picture`);
const bigPictureCloseBtn = bigPictureContainer.querySelector(`.big-picture__cancel`);
const bigPictureImg = bigPictureContainer.querySelector(`.big-picture__img > img`);
const socialComments = bigPictureContainer.querySelector(`.social__comments`);
const likesCount = bigPictureContainer.querySelector(`.likes-count`);
const pictureDescription = bigPictureContainer.querySelector(`.social__caption`);
const commentsCount = bigPictureContainer.querySelector(`.social__comment-count`);
const allCommentsCount = commentsCount.querySelector(`.comments-count`);
const socialCommentsList = socialComments.children;
const commentTemplate = socialComments.querySelector(`.social__comment`);
const moreCommentsBtn = bigPictureContainer.querySelector(`.comments-loader`);

const clearCommentField = () => {
  Array.from(socialCommentsList).forEach((it) => it.remove());
};
const renderComment = (comment) => {
  const newCommentElement = commentTemplate.cloneNode(true);
  newCommentElement.querySelector(`img`).src = comment.avatar;
  newCommentElement.querySelector(`img`).alt = comment.name;
  newCommentElement.querySelector(`.social__text`).textContent = comment.message;
  return newCommentElement;
};
let currentCommentsCount;
const onMoreCommentsBtnClick = () => {
  const firstCommentHiddenIndex = currentCommentsCount;
  currentCommentsCount += SOCIAL_COMMENTS_BY_CLICK;
  if (currentCommentsCount >= socialCommentsList.length) {
    currentCommentsCount = socialCommentsList.length;
    moreCommentsBtn.classList.add(`hidden`);
  }
  Array.from(socialCommentsList).filter((socialComment, i) => {
    if (i >= firstCommentHiddenIndex && i < currentCommentsCount) {
      socialComment.classList.remove(`visually-hidden`);
    }
  });
  commentsCount.textContent = `${currentCommentsCount} из ${socialCommentsList.length} комментариев`;
};
const getSocialCommentsByClick = () => {
  if (socialCommentsList.length <= SOCIAL_COMMENTS_BY_CLICK) {
    moreCommentsBtn.classList.add(`hidden`);
    commentsCount.textContent = `${socialCommentsList.length} из ${socialCommentsList.length} комментариев`;
  } else {
    moreCommentsBtn.classList.remove(`hidden`);
    commentsCount.textContent = `${SOCIAL_COMMENTS_BY_CLICK} из ${socialCommentsList.length} комментариев`;
    Array.from(socialCommentsList).filter((socialComment, i) => {
      if (i >= SOCIAL_COMMENTS_BY_CLICK) {
        socialComment.classList.add(`visually-hidden`);
      }
    });
    currentCommentsCount = SOCIAL_COMMENTS_BY_CLICK;
    moreCommentsBtn.addEventListener(`click`, onMoreCommentsBtnClick);
  }
};

const openBigPicture = (picturesObject) => {
  bigPictureContainer.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  bigPictureCloseBtn.addEventListener(`click`, onBigPictureCloseBtnClick);
  document.addEventListener(`keydown`, onDocumentKeydownEscCloseBigPicture);
  bigPictureImg.src = picturesObject.url;
  likesCount.textContent = picturesObject.likes;
  allCommentsCount.textContent = picturesObject.comments.length;
  pictureDescription.textContent = picturesObject.description;
  clearCommentField();
  const commentsFragment = document.createDocumentFragment();
  picturesObject.comments.forEach((it) => commentsFragment.appendChild(renderComment(it)));
  socialComments.appendChild(commentsFragment);
  getSocialCommentsByClick();
};
window.getBigPicture = (minPictures, picturesObject) => {
  minPictures.addEventListener(`click`, () => {
    openBigPicture(picturesObject);
  });
};
const closeBigPicture = () => {
  bigPictureContainer.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  bigPictureCloseBtn.removeEventListener(`click`, onBigPictureCloseBtnClick);
  document.removeEventListener(`keydown`, onDocumentKeydownEscCloseBigPicture);
  moreCommentsBtn.removeEventListener(`click`, onMoreCommentsBtnClick);
};
const onDocumentKeydownEscCloseBigPicture = (evt) => {
  window.util.isEscEvent(evt, closeBigPicture);
};
const onBigPictureCloseBtnClick = () => {
  closeBigPicture();
};
