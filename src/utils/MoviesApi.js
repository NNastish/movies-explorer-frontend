// BeatFilm Api

export const BASE_URL_YANDEX =  'https://api.nomoreparties.co';

const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)

export const getBaseFilms = () => {
    return fetch(`${BASE_URL_YANDEX}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(handleResponse);
}


