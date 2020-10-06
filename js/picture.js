'use strict';

(function () {
  const body = document.querySelector('body');
  const pictures = body.querySelectorAll('.picture');
  const bigPictureContainer = body.querySelector('.big-picture');
  const bigPictureCloseBtn = bigPictureContainer.querySelector('.big-picture__cancel');
  const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img > img');
  const socialComments = bigPictureContainer.querySelector('.social__comments');
  const likesCount = bigPictureContainer.querySelector('.likes-count');
  const commentsCount = bigPictureContainer.querySelector('.comments-count');
  const pictureDescription = bigPictureContainer.querySelector('.social__caption');
  const socialComment = socialComments.children;
  const commentTemplate = socialComments.querySelector('.social__comment');

  const clearCommentField = () => {
    for (let i = socialComment.length - 1; i >= 0; i--) {
      socialComment[i].remove();
    }
  };
  const renderComment = (comment) => {
    const newCommentElement = commentTemplate.cloneNode(true);
    newCommentElement.querySelector('img').src = comment.avatar;
    newCommentElement.querySelector('img').alt = comment.name;
    newCommentElement.querySelector('.social__text').textContent = comment.message;
    return newCommentElement;
  };
  const openFullPicture = (minPictures, picturesObject) => {
    clearCommentField();
    bigPictureContainer.classList.remove('hidden');
    body.classList.add('modal-open');
    bigPictureCloseBtn.addEventListener('click', onCloseFullPicture);
    document.addEventListener('keydown', onCloseFullPictureEsc);
    bigPictureImg.src = picturesObject.url;
    likesCount.textContent = picturesObject.likes;
    commentsCount.textContent = picturesObject.comments.length;
    pictureDescription.textContent = picturesObject.description;
    const commentsFragment = document.createDocumentFragment();
    for (let i = 0; i < picturesObject.comments.length; i++) {
      commentsFragment.appendChild(renderComment(picturesObject.comments[i]));
    }
    socialComments.appendChild(commentsFragment);
  };
  const getFullPicture = (minPictures, picturesObject) => {
    minPictures.addEventListener('click', () => {
      openFullPicture(minPictures, picturesObject);
    });
    minPictures.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        openFullPicture(minPictures, picturesObject);
      }
    });
  };
  for (let i = 0; i < pictures.length; i++) {
    getFullPicture(pictures[i], window.pictureObjects[i]);
  }
  const closeFullPicture = () => {
    bigPictureContainer.classList.add('hidden');
    body.classList.remove('modal-open');
    bigPictureCloseBtn.removeEventListener('click', onCloseFullPicture);
    document.removeEventListener('keydown', onCloseFullPictureEsc);
  };
  const onCloseFullPictureEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeFullPicture();
    }
  };
  const onCloseFullPicture = () => {
    closeFullPicture();
  };

  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');

})();
