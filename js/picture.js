'use strict';

(function () {
  // document.querySelector('.big-picture').classList.remove('hidden');
  // document.querySelector('body').classList.add('modal-open');
  const bigPictureImgContainer = document.querySelector('.big-picture__img');
  const socialComments = document.querySelector('.social__comments');
  const socialComment = socialComments.children;
  const commentTemplate = socialComments.querySelector('.social__comment');

  for (let i = socialComment.length - 1; i >= 0; i--) {
    socialComment[i].remove();
  }

  bigPictureImgContainer.querySelector('img').src = window.pictureObjects[0].url;
  document.querySelector('.likes-count').textContent = window.pictureObjects[0].likes;
  document.querySelector('.comments-count').textContent = window.pictureObjects[0].comments.length;

  const renderComment = (comment) => {
    const newCommentElement = commentTemplate.cloneNode(true);

    newCommentElement.querySelector('img').src = comment.avatar;
    newCommentElement.querySelector('img').alt = comment.name;
    newCommentElement.querySelector('.social__text').textContent = comment.message;

    return newCommentElement;
  };

  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < window.pictureObjects[0].comments.length; i++) {
    commentsFragment.appendChild(renderComment(window.pictureObjects[0].comments[i]));
  }
  socialComments.appendChild(commentsFragment);

  document.querySelector('.social__caption').textContent = window.pictureObjects[0].description;

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

})();
