import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import {
  parseFilmDurationToView, defineImageLink,
  defineIsMovieLiked, defineTrailerLink,
} from '../../../utils/utils';

export default function MoviesCard({
  isSavedRoute, film, saveMovie, deleteMovie, savedMoviesId,
}) {
  const movieImageLink = defineImageLink(isSavedRoute, film);
  const movieTrailerLink = defineTrailerLink({ trailer: film.trailerLink });
  const movieDuration = parseFilmDurationToView(film);
  // const isMovieLiked = defineIsMovieLiked(film, savedMoviesId);
  const [isMovieLiked, setIsMovieLiked] = useState(defineIsMovieLiked(film, savedMoviesId));
  const movieButtonClassMoviesRoute = isMovieLiked ? 'movies__button-add' : 'movies__button';
  const movieButtonClass = isSavedRoute ? 'movies__button-delete' : movieButtonClassMoviesRoute;
  const tumbler = isSavedRoute || isMovieLiked;
  const movieButtonText = tumbler ? '' : 'Сохранить';

  const handleClick = () => {
    if (tumbler) {
      deleteMovie(film);
    } else {
      saveMovie(film);
    }
  };

  useEffect(() => {
    const value = defineIsMovieLiked(film, savedMoviesId);
    setIsMovieLiked(value);
  }, [film, savedMoviesId]);

  return (
    <div className="movies">
      <div className="movies__info">
        <h1 className="movies__title">{film.nameRU}</h1>
        <p className="movies__time">{movieDuration}</p>
        <button
          className={movieButtonClass}
          onClick={handleClick}
          type="button"
        >
          {movieButtonText}
        </button>
      </div>
      <a target="_blank" href={movieTrailerLink} rel="noreferrer">
        <img className="movies__image" alt={film.nameRU} src={movieImageLink} />
      </a>
    </div>
  );
}
