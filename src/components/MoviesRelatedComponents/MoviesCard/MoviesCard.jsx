import React, { useContext, useEffect, useState } from 'react';
import './MoviesCard.css';
import { findEndPoint, parseFilmDurationToView, showError } from "../../../utils/utils";
import { BASE_URL_YANDEX } from '../../../utils/MoviesApi';
import { CurrentLocationContext } from '../../../contexts/CurrentLocationContext';
import * as api from '../../../utils/MainApi';

export default function MoviesCard({ film, saveMovie, deleteMovie }) {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [buttonClass, setButtonClass] = useState('');
    const [isYandexSource, setIsYandexSource] = useState(true);
    const currentLocation = useContext(CurrentLocationContext);

    const determineButtonClass = () => {
        if (isButtonClicked) {
            return 'movies__button';
        }
        return 'movies__button-add';
    }


    const changeButtonState = () => {
        setIsButtonClicked(!isButtonClicked);
        if (isYandexSource) {
            setButtonClass(determineButtonClass());
        }
    }

    const isSave = () => isYandexSource && !isButtonClicked;

    const isButtonNameVisible = () => isSave() ? 'Сохранить' : ''

    const handleClick = () => {
        isSave() ? saveMovie(film) : deleteMovie(film._id);
        changeButtonState();
    }

    const defineImageLink = () => {
        return isYandexSource ? `${BASE_URL_YANDEX}${film?.image?.url}` : film?.image;
    }

    useEffect(() => {
        const endPoint = findEndPoint(currentLocation);
        if (endPoint === '/movies') {
            setIsYandexSource(true);
            setButtonClass('movies__button');
        } else {
            setIsYandexSource(false);
            // setSavedMovieId(film?._id);
            setButtonClass('movies__button-delete');
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
                    {isYandexSource && isButtonNameVisible()}
                </button>
            </div>
            <a target="_blank" href={film.trailerLink}>
                <img className={'movies__image'} alt={'Фильм'} src={defineImageLink()} />
            </a>
        </div>
    )
}
