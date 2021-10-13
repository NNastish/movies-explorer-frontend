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

const UNIQUE_VALUE_ERROR = 'Значения полей не должны повторяться';

const PROFILE_UPDATE_ERROR = 'Ошибка при изменении данных профиля.';

const LOGIN_ERROR = 'Ошибка при попытке логина. Пожалуйста проверьте ваши данные и повторите вход.';

const REGISTER_ERROR = 'Ошибка при попытке регистрации. Пожалуйста проверьте ваши данные и повторите регистрацию.';

const PROFILE_UPDATE_SUCCESS = 'Ваш профиль успешно обновлён.';

// const emailRegex = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$';
const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const emailCheck = new RegExp(emailRegex);

export {
  FOOTER_HEADER_ENDPOINTS, CLARIFY_LOGIN,
  CLARIFY_REGISTER, SHORT_FILM_DURATION_LIMIT,
  HOURS_BETWEEN_LOCALSTORAGE_UPDATE, YANDEX_API_URL, SERVER_API_URL,
  NOT_FOUND_TEXT, REQUEST_ERROR, MOVIES_EMPTY, UNIQUE_VALUE_ERROR,
  PROFILE_UPDATE_ERROR, PROFILE_UPDATE_SUCCESS, LOGIN_ERROR,
  REGISTER_ERROR, emailCheck,
};
