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

export {
  FOOTER_HEADER_ENDPOINTS, CLARIFY_LOGIN,
  CLARIFY_REGISTER, SHORT_FILM_DURATION_LIMIT,
  HOURS_BETWEEN_LOCALSTORAGE_UPDATE,
};
