import { getData } from './api.js';
import { renderPhotoThumbnailList } from './photoThumbnails.js';
import { setUploadFormSubmit, closePopup } from './imgUploadForm.js';
import './imgUploadScale.js';
import './imgUploadEffects.js';


getData()
  .then((photos) => renderPhotoThumbnailList(photos))
  .catch(() => { });


setUploadFormSubmit(closePopup);
