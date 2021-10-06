import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ films, saveMovie, deleteMovie }) {
  return (
    <div className="movies-card__list">
      {
                films.map((movie) => (
                  <MoviesCard
                    key={movie.id || movie.movieId}
                    film={movie}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                  />
                ))
            }
    </div>
  );
}
