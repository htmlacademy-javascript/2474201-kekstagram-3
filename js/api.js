import { showAlert } from './utils.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram.';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const SuccessText = {
  [ Method.POST ]: () => showAlert('success'),
};

const ErrorText = {
  [ Method.GET ]: () => showAlert('data-error'),
  [ Method.POST ]: () => showAlert('error'),
};


const load = function (route, method = Method.GET, body = null) {
  return fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject(new Error(`Ошибка обработки данных: ${response.status}`))
    )
    .then((data) => {
      if (SuccessText[ method ]) {
        SuccessText[ method ]();
      }

      return data;
    })
    .catch((err) => {
      ErrorText[ method ]();
      throw err;
    });
};


const getData = function () {
  return load(Route.GET_DATA);
};


const sendData = function (body) {
  return load(Route.SEND_DATA, Method.POST, body);
};


export { getData, sendData };
