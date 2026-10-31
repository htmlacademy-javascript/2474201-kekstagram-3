import { showAlert } from './utils.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const SuccessText = {
  SEND_DATA: () => showAlert('success'),
};

const ErrorText = {
  GET_DATA: () => showAlert('data-error'),
  SEND_DATA: () => showAlert('error'),
};


const load = function (route, errorText, successText = null, method = Method.GET, body = null) {
  return fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка обработки данных: ${response.status}`);
      }

      return method === Method.GET ? response.json() : null;
    })
    .then((data) => {
      if (successText) {
        successText();
      }

      return data;
    })
    .catch((err) => {
      errorText();
      throw err;
    });
};


const getData = function () {
  return load(Route.GET_DATA, ErrorText.GET_DATA);
};


const sendData = function (body) {
  return load(Route.SEND_DATA, ErrorText.SEND_DATA, SuccessText.SEND_DATA, Method.POST, body);
};


export { getData, sendData };
