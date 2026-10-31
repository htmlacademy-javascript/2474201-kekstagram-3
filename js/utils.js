const ALERT_SHOW_TIME = 5000;


const getRandomInteger = function (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const createId = function () {
  let previousValues = 1;

  return function () {
    return previousValues++;
  };
};


const getRandomArrayElement = function (elements, count = 1) {
  let randomElements = '';

  for (let i = 0; i < count; i++) {
    randomElements += `${elements[ getRandomInteger(0, elements.length - 1) ]} `;
  }
  return randomElements.trimEnd();
};


const isEscapeKey = function (evt) {
  return (evt.key === 'Escape');
};


const showAlert = function (message) {
  const alertTemplateElement = document.querySelector(`#${message}`)
    .content
    .querySelector(`.${message}`);
  const alertElement = alertTemplateElement.cloneNode(true);
  document.body.append(alertElement);

  const closeButtonElement = alertElement.querySelector(`.${message}__button`);
  if (closeButtonElement) {
    closeButtonElement.addEventListener('click', () => {
      removeAlert();
    });
  }

  document.addEventListener('keydown', onDocumentKeydown, true);
  document.addEventListener('click', onDocumentClick);

  const timeoutId = setTimeout(removeAlert, ALERT_SHOW_TIME);


  function removeAlert() {
    alertElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown, true);
    document.removeEventListener('click', onDocumentClick);
    clearTimeout(timeoutId);
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      removeAlert();
    }
  }

  function onDocumentClick(evt) {
    const isOutside = !evt.target.closest(`.${message}__inner`);
    if (closeButtonElement && isOutside) {
      removeAlert();
    }
  }
};


export {
  getRandomInteger,
  createId,
  getRandomArrayElement,
  isEscapeKey,
  showAlert,
};
