import { getData } from './api.js';
import { renderGallery } from './photoThumbnails.js';
import { setUploadFormSubmit, closePopup } from './imgUploadForm.js';
import './imgUploadScale.js';
import './imgUploadEffects.js';
import { initFilters } from './photoFilters.js';


getData()
  .then((photos) => {
    renderGallery(photos);
    initFilters(photos);
  })
  .catch(() => { });


setUploadFormSubmit(closePopup);
