const FOOTER_HEADER_ENDPOINTS = ['/', '/movies', '/saved-movies', '/profile'];
const CLARIFY_LOGIN = {
  question: 'Уже зарегестрированы?',
  action: 'Войти',
  linkTo: '/signin',
};

const CLARIFY_REGISTER = {
  question: 'Ещё не зарегестрированы?',
  action: 'Регистрация',
  linkTo: '/signup',
};

const SHORT_FILM_DURATION_LIMIT = 40;

const HOURS_BETWEEN_LOCALSTORAGE_UPDATE = 4;

const YANDEX_API_URL = 'https://api.nomoreparties.co';

const SERVER_API_URL = 'https://movies-explorer-api.nomoredomains.monster';

const NOT_FOUND_TEXT = 'Ничего не найдено';

const MOVIES_EMPTY = 'MoviesEmpty';

const REQUEST_ERROR = 'Во время вашего запроса случилась ошибка. Попробуйте перезагрузить страницу или повторить действие позднее.';

export {
  FOOTER_HEADER_ENDPOINTS, CLARIFY_LOGIN,
  CLARIFY_REGISTER, SHORT_FILM_DURATION_LIMIT,
  HOURS_BETWEEN_LOCALSTORAGE_UPDATE, YANDEX_API_URL, SERVER_API_URL,
  NOT_FOUND_TEXT, REQUEST_ERROR, MOVIES_EMPTY,
};
