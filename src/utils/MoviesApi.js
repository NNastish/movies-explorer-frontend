/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-promise-reject-errors */
// BeatFilm Api
import { YANDEX_API_URL } from './constants';

// eslint-disable-next-line prefer-promise-reject-errors
const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

export function getBaseFilms() {
  return fetch(`${YANDEX_API_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((responce) => handleResponse(responce));
}
