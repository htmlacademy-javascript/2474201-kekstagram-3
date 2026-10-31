const FILE_TYPES = [ 'jpg', 'jpeg', 'png' ];

let previewUrl = null;

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadFormPreviewImageElement = uploadFormElement.querySelector('.img-upload__preview img');
const defaultPreviewSrc = uploadFormPreviewImageElement.getAttribute('src');


const createFile = function () {
  const file = uploadFormInputElement.files[ 0 ];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    previewUrl = URL.createObjectURL(file);
    uploadFormPreviewImageElement.src = previewUrl;
  }
};


const resetFile = () => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  uploadFormPreviewImageElement.src = defaultPreviewSrc;
};


export { createFile, resetFile };
