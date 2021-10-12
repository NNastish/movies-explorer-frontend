import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  isEmpty, visibleMovies, saveMovie, deleteMovie, savedMoviesId, isSavedRoute,
}) {
  return (
    <div className="movies-card__list">
      {isEmpty ? '' : visibleMovies.map((movie) => (
        <MoviesCard
          key={isSavedRoute ? movie._id : movie.id}
          isSavedRoute={isSavedRoute}
          film={movie}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          savedMoviesId={savedMoviesId}
        />
      ))}
    </div>
  );
}
