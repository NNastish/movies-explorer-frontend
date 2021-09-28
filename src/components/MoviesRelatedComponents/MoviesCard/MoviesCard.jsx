import React, { useContext, useEffect, useState } from 'react';
import './MoviesCard.css';
import { findEndPoint, parseFilmDurationToView, showError } from "../../../utils/utils";
import { BASE_URL_YANDEX } from '../../../utils/MoviesApi';
import { CurrentLocationContext } from '../../../contexts/CurrentLocationContext';
import * as api from '../../../utils/MainApi';

export default function MoviesCard({ film, saveMovie, deleteMovie }) {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [buttonClass, setButtonClass] = useState('movies__button');
    const [isYandexSource, setIsYandexSource] = useState(true);
    const [savedMovieId, setSavedMovieId] = useState('');
    const currentLocation = useContext(CurrentLocationContext);

    async function saveMovie(movie) {
        try {
            const { country, director, duration, year, description, image, trailerLink: trailer, nameRU, nameEN, id: movieId} = movie;
            const imageUrl = `${BASE_URL_YANDEX}${image?.url}`
            const thumbnail = `${BASE_URL_YANDEX}${image?.formats?.thumbnail?.url}`
            const movieToSave = {country, director, duration, year, description, image: imageUrl, trailer, nameEN, nameRU, movieId, thumbnail};
            const savedMovie = await api.saveMovie(movieToSave);
            if (savedMovie) {
                setSavedMovieId(savedMovie._id);
            }
        } catch (e) {
            showError(e);
        }
    }

    async function deleteMovie(movieId) {
        try {
            const deleted = await api.deleteMovie(movieId);
            if (deleted) {
                setSavedMovieId('');
            }
        } catch (e) {
            showError(e);
        }
    }

    const determineButtonClass = () => {
        if (isYandexSource) {
            if (isButtonClicked) {
                return 'movies__button';
            }
            if (!isButtonClicked) {
                return 'movies__button-add';
            }
        } else {
            return 'movies__button-delete';
        }
    }

    const changeButtonState = () => {
        setIsButtonClicked(!isButtonClicked);
        setButtonClass(determineButtonClass);
    }

    const isSave = () => isYandexSource && !isButtonClicked;

    const isButtonNameVisible = () => isSave() ? 'Сохранить' : ''

    const handleClick = () => {
        isSave() ? saveMovie(film) : deleteMovie(savedMovieId);
        changeButtonState();
    }

    useEffect(() => {
        const endPoint = findEndPoint(currentLocation);
        if (endPoint === '/movies') {
            setIsYandexSource(true);
        } else {
            setIsYandexSource(false);
        }
    }, [currentLocation])

    return (
        <div className={'movies'}>
            <div className={'movies__info'}>
                <h1 className={'movies__title'}>{film.nameRU}</h1>
                <p className={'movies__time'}>{parseFilmDurationToView(film)}</p>
                <button
                    className={buttonClass}
                    onClick={handleClick}
                >
                    {isButtonNameVisible()}
                </button>
            </div>
            <a target="_blank" href={film.trailerLink}>
                <img className={'movies__image'} alt={'Фильм'} src={`${BASE_URL_YANDEX}${film?.image?.url}`}/>
            </a>
        </div>
    )
}
