import { renderGallery } from './photoThumbnails.js';


const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_COUNT = 10;

let currentFilter = Filter.DEFAULT;
let photos = [];


const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');


const sortRandomly = function () {
  return Math.random() - 0.5;
};

const sortByComments = function (photoA, photoB) {
  return photoB.comments.length - photoA.comments.length;
};

const getFilteredPhotos = function () {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [ ...photos ].sort(sortRandomly).slice(0, RANDOM_PHOTOS_COUNT);

    case Filter.DISCUSSED:
      return [ ...photos ].sort(sortByComments);

    default:
      return [ ...photos ];
  }
};


filtersFormElement.addEventListener('click', (evt) => {
  const buttonClickElement = evt.target.closest('.img-filters__button');
  const buttonActiveElement = filtersFormElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (!buttonClickElement || (buttonClickElement === buttonActiveElement)) {
    return;
  }

  buttonActiveElement.classList.remove(ACTIVE_BUTTON_CLASS);
  buttonClickElement.classList.add(ACTIVE_BUTTON_CLASS);
  currentFilter = buttonClickElement.id;

  const filteredPhotos = getFilteredPhotos();
  renderGallery(filteredPhotos);
});


const initFilters = (loadedPhotos) => {
  filtersElement.classList.remove('img-filters--inactive');
  photos = loadedPhotos;
};


export { initFilters };
