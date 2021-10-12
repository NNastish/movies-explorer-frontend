/* eslint-disable prefer-rest-params */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { compareIfBasicArrayBigger, defineMovieQuantityParams, delay } from '../../utils/utils';

export default function MoviesView({
  movies, saveMovie, deleteMovie, savedMoviesId, isSavedRoute,
}) {
  const [visibleMoviesLength, setVisibleMoviesLength] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // eslint-disable-next-line prefer-arrow-callback
    const handleResizing = delay(function handleResize() {
      setWindowWidth(window.innerWidth);
    }, 1000);
    window.addEventListener('resize', handleResizing);
    return () => {
      window.removeEventListener('resize', handleResizing);
    };
  }, []);

  useEffect(() => {
    const { initialQuantity } = defineMovieQuantityParams({ windowWidth });
    setVisibleMoviesLength(initialQuantity);
  }, [movies, windowWidth]);

  const onAddMoviesClick = () => {
    const { addQuantity } = defineMovieQuantityParams({ windowWidth });
    const newArrayLength = visibleMoviesLength + addQuantity;
    const possibleCutLength = newArrayLength < movies.length ? newArrayLength : movies.length;
    setVisibleMoviesLength(possibleCutLength);
  };

  return (
    <>
      <MoviesCardList
        movies={movies}
        visibleMoviesLength={visibleMoviesLength}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        savedMoviesId={savedMoviesId}
        isSavedRoute={isSavedRoute}
      />
      {compareIfBasicArrayBigger({
        basicLength: movies.length, comparableLength: visibleMoviesLength,
      }) ? (
        <button
          className="movies-card__button"
          type="button"
          onClick={onAddMoviesClick}
        >
          Ещё
        </button>
        ) : null}
    </>
  );
}
