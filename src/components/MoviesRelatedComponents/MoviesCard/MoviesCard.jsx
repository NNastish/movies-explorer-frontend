import React, { useContext, useEffect, useState } from 'react';
import './MoviesCard.css';
import { findEndPoint, parseFilmDurationToView } from '../../../utils/utils';
import { BASE_URL_YANDEX } from '../../../utils/MoviesApi';
import { CurrentLocationContext } from '../../../contexts/CurrentLocationContext';

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
  };

  const changeButtonState = () => {
    setIsButtonClicked(!isButtonClicked);
    if (isYandexSource) {
      setButtonClass(determineButtonClass());
    }
  };

  const isSave = () => isYandexSource && !isButtonClicked;

  const isButtonNameVisible = () => (isSave() ? 'Сохранить' : '');

  const makeAction = (isSavingAction, movie) => {
    if (isSavingAction) {
      saveMovie(movie);
    } else {
      deleteMovie(movie._id);
    }
  };

  const handleClick = () => {
    makeAction(isSave(), film);
    changeButtonState();
  };

  const defineImageLink = () => (isYandexSource ? `${BASE_URL_YANDEX}${film?.image?.url}` : film?.image);

  useEffect(() => {
    const endPoint = findEndPoint(currentLocation);
    if (endPoint === '/movies') {
      setIsYandexSource(true);
      setButtonClass('movies__button');
    } else {
      setIsYandexSource(false);
      setButtonClass('movies__button-delete');
    }
  }, [currentLocation]);

  return (
    <div className="movies">
      <div className="movies__info">
        <h1 className="movies__title">{film.nameRU}</h1>
        <p className="movies__time">{parseFilmDurationToView(film)}</p>
        <button
          className={buttonClass}
          onClick={handleClick}
          type="button"
        >
          {isYandexSource && isButtonNameVisible()}
        </button>
      </div>
      <a target="_blank" href={film.trailerLink} rel="noreferrer">
        <img className="movies__image" alt="Фильм" src={defineImageLink()} />
      </a>
    </div>
  );
}
