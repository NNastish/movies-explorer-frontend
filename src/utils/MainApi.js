// our api
import { SERVER_API_URL, YANDEX_API_URL } from './constants';

// eslint-disable-next-line prefer-promise-reject-errors
const handleResponse = (response) => (response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));

export const register = (registration) => {
  const { name, email, password } = registration;
  return fetch(`${SERVER_API_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
      name,
    }),
  })
    .then((response) => handleResponse(response));
};

export const login = (loginInfo) => {
  const { email, password } = loginInfo;
  return fetch(`${SERVER_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => handleResponse(response));
};

export const getUserContent = (token) => fetch(`${SERVER_API_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => handleResponse(response));

export const updateUserInfo = (userInfo, tokenJwt) => fetch(`${SERVER_API_URL}/users/me`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenJwt}`,
  },
  body: JSON.stringify(userInfo),
})
  .then((response) => handleResponse(response));

export const saveMovie = (movie, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: movie.country || 'null',
      nameRU: movie.nameRU || 'null',
      nameEN: movie.nameEN || 'null',
      movieId: movie.id.toString(),
      director: movie.director || 'null',
      duration: movie.duration || 0,
      year: movie.year || 0,
      description: movie.description || 'null',
      image: `${YANDEX_API_URL}${movie.image.url}`,
      trailer: movie.trailerLink.startsWith('https') ? movie.trailerLink : 'www.youtube.com',
      thumbnail: `${YANDEX_API_URL}${movie.image.formats.thumbnail.url}`,
    }),
  };
  return fetch(`${SERVER_API_URL}/movies`, options)
    .then((response) => handleResponse(response));
};

export const deleteMovie = (movieId, token) => fetch(`${SERVER_API_URL}/movies/${movieId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => handleResponse(response));

export const getSavedMovies = (token) => fetch(`${SERVER_API_URL}/movies`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => handleResponse(response));
