// BeatFilm Api
import { YANDEX_API_URL } from './constants';

// eslint-disable-next-line prefer-promise-reject-errors
const handleResponse = (response) => (response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));

export default function getBaseFilms() {
  fetch(`${YANDEX_API_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
}
