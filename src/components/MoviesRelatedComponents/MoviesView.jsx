import React from 'react';
import { useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { defineMovieQuantityParams } from '../../utils/utils';

export default function MoviesView({
  movies, saveMovie, deleteMovie, savedMoviesId, isSavedRoute
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleMovies, setVisibleMovies] = useState([]);

  return (
    // isPreloader()
    //   ? (
    //     <Preloader
    //       preloaderState={preloaderState}
    //     />
    //   )
    //   : (
    //     <section className="movies-card">
    //       <MoviesCardList
    //         films={films}
    //         saveMovie={saveMovie}
    //         deleteMovie={deleteMovie}
    //       />
    //       <button
    //         className="movies-card__button"
    //         type="button"
    //         onClick={changeVisibleMovies}
    //         style={{ visibility: isAddAvailable ? 'visible' : 'hidden' }}
    //       >
    //         Ещё
    //       </button>
    //     </section>
    //   )
  );
}
