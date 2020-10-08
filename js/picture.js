'use strict';

(function () {
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
    for (let i = socialCommentsList.length - 1; i >= 0; i--) {
      socialCommentsList[i].remove();
    }
  };
  const renderComment = (comment) => {
    const newCommentElement = commentTemplate.cloneNode(true);
    newCommentElement.querySelector(`img`).src = comment.avatar;
    newCommentElement.querySelector(`img`).alt = comment.name;
    newCommentElement.querySelector(`.social__text`).textContent = comment.message;
    return newCommentElement;
  };
  const getSocialCommentsByClick = (picturesObject) => {
    let j = SOCIAL_COMMENTS_BY_CLICK;
    if (socialCommentsList.length > j) {
      for (let i = j; i < socialCommentsList.length; i++) {
        socialCommentsList[i].classList.add(`visually-hidden`);
        moreCommentsBtn.classList.remove(`hidden`);
        commentsCount.textContent = `${j} из ${picturesObject.comments.length} комментариев`;
      }
    } else {
      commentsCount.textContent = `${picturesObject.comments.length} из ${picturesObject.comments.length} комментариев`;
      moreCommentsBtn.classList.add(`hidden`);
    }
    moreCommentsBtn.addEventListener(`click`, () => {
      if (j + SOCIAL_COMMENTS_BY_CLICK >= socialCommentsList.length) {
        j = socialCommentsList.length - 5;
        moreCommentsBtn.classList.add(`hidden`);
      }
      commentsCount.textContent = `${j + SOCIAL_COMMENTS_BY_CLICK} из ${picturesObject.comments.length} комментариев`;
      if (socialCommentsList.length > SOCIAL_COMMENTS_BY_CLICK) {
        for (let i = j; i < j + SOCIAL_COMMENTS_BY_CLICK; i++) {
          socialCommentsList[i].classList.remove(`visually-hidden`);
        }
        j += SOCIAL_COMMENTS_BY_CLICK;
      }
    });
  };
  const openFullPicture = (minPictures, picturesObject) => {
    clearCommentField();
    bigPictureContainer.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    bigPictureCloseBtn.addEventListener(`click`, onCloseFullPicture);
    document.addEventListener(`keydown`, onCloseFullPictureEsc);
    bigPictureImg.src = picturesObject.url;
    likesCount.textContent = picturesObject.likes;
    allCommentsCount.textContent = picturesObject.comments.length;
    pictureDescription.textContent = picturesObject.description;
    const commentsFragment = document.createDocumentFragment();
    for (let i = 0; i < picturesObject.comments.length; i++) {
      commentsFragment.appendChild(renderComment(picturesObject.comments[i]));
    }
    socialComments.appendChild(commentsFragment);
    getSocialCommentsByClick(picturesObject);
  };
  window.getFullPicture = (minPictures, picturesObject) => {
    minPictures.addEventListener(`click`, () => {
      openFullPicture(minPictures, picturesObject);
    });
    minPictures.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        openFullPicture(minPictures, picturesObject);
      }
    });
  };
  const closeFullPicture = () => {
    bigPictureContainer.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    bigPictureCloseBtn.removeEventListener(`click`, onCloseFullPicture);
    document.removeEventListener(`keydown`, onCloseFullPictureEsc);
  };
  const onCloseFullPictureEsc = (evt) => {
    if (evt.key === `Escape`) {
      closeFullPicture();
    }
  };
  const onCloseFullPicture = () => {
    closeFullPicture();
  };

})();
