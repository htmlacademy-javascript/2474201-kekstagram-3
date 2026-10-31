import { sendData } from './api.js';
import { isEscapeKey } from './utils.js';
import { isValid, resetValidation } from './imgUploadValidation.js';
import { resetScale } from './imgUploadScale.js';
import { resetFilter } from './imgUploadEffects.js';
import { createFile, resetFile } from './imgUploadPreview.js';


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};


const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadFormOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadFormHashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const uploadFormDescriptionElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');


const openPopup = function () {
  uploadFormOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};


const closePopup = function () {
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormInputElement.value = '';
  uploadFormHashtagsElement.value = '';
  uploadFormDescriptionElement.value = '';
  resetValidation();
  resetScale();
  resetFilter();
  resetFile();
};


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}


uploadFormInputElement.addEventListener('change', () => {
  openPopup();
  createFile();
});


uploadFormCloseElement.addEventListener('click', () => {
  closePopup();
});


uploadFormHashtagsElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});


uploadFormDescriptionElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});


const blockSubmitButton = function () {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};


const unblockSubmitButton = function () {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};


const setUploadFormSubmit = function (onSuccess) {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isValid()) {
      blockSubmitButton();

      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => { })
        .finally(unblockSubmitButton);
    }
  });
};

export { setUploadFormSubmit, closePopup };
