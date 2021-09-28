// our api
const BASE_URL = 'https://movies-explorer-api.nomoredomains.monster';

const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);

export const register = (registration) => {
    const {name, email, password} = registration;
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email,
            "name": name,
        })
    })
        .then(response => handleResponse(response))
};

export const login = (loginInfo) => {
    const {email, password} = loginInfo;
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"password": password, "email": email})
    })
        .then(response => handleResponse(response))
};

export const getUserContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => handleResponse(response))
}

export const updateUserInfo = (userInfo, token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    })
        .then(response => handleResponse(response))
}

const token = localStorage.getItem('jwt');
const authorization = `Bearer ${token}`;

export const saveMovie = (movie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization,
        },
        body: JSON.stringify(movie)
    })
        .then(response => handleResponse(response));
}

export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': authorization,
        },
    })
        .then(response => handleResponse(response));
}

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    })
    .then(response => handleResponse(response));
}