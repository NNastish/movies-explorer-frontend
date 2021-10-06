import React from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';

const MoviesViewController = ({
  preloaderState, films, saveMovie, deleteMovie, changeVisibleMovies, isAddAvailable,
}) => {
  function isPreloader() {
    const notFound = !films || films.length === 0;
    return preloaderState || notFound;
  }

  return (
    isPreloader()
      ? (
        <Preloader
          preloaderState={preloaderState}
        />
      )
      : (
        <section className="movies-card">
          <MoviesCardList
            films={films}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
          />
          <button
            className="movies-card__button"
            type="button"
            onClick={changeVisibleMovies}
            style={{ visibility: isAddAvailable ? 'visible' : 'hidden' }}
          >
            Ещё
          </button>
        </section>
      )
  );
};

export default MoviesViewController;
