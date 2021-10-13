import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIES_EMPTY } from '../../../utils/constants';

export default function MoviesCardList({
  movies, visibleMoviesLength, saveMovie, deleteMovie, savedMoviesId, isSavedRoute,
}) {
  return (
    <div className="movies-card__list">
      {movies === MOVIES_EMPTY ? ''
        : movies.reduce((visibleMovies, movie) => {
          if (visibleMovies.length < visibleMoviesLength) {
            visibleMovies.push(
              <MoviesCard
                key={isSavedRoute ? movie._id : movie.id}
                isSavedRoute={isSavedRoute}
                film={movie}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                savedMoviesId={savedMoviesId}
              />,
            );
          }
          return visibleMovies;
        }, [])}
    </div>
  );
}
