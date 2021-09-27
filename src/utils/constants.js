const FOOTER_HEADER_ENDPOINTS = ['/', '/movies', '/saved-movies', '/profile'];
const CLARIFY_LOGIN = {
    question: 'Уже зарегестрированы?',
    action: 'Войти',
    linkTo: '/signin'
}

const CLARIFY_REGISTER = {
    question: 'Ещё не зарегестрированы?',
    action: 'Регистрация',
    linkTo: '/signup'
}

const SHORT_FILM_DURATION_LIMIT = 40;

export { FOOTER_HEADER_ENDPOINTS, CLARIFY_LOGIN, CLARIFY_REGISTER, SHORT_FILM_DURATION_LIMIT };
