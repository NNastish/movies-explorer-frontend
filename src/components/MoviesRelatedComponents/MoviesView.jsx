import React, { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { compareIfBasicArrayBigger } from '../../utils/utils';
import { useVisibleMoviesQuantity } from '../../utils/customHooks';
import { MOVIES_EMPTY } from '../../utils/constants';

export default function MoviesView({
  movies, saveMovie, deleteMovie, savedMoviesId, isSavedRoute,
}) {
  const [visibleMovies, setVisibleMovies] = useState([]);
  const { initialQuantity, addQuantity } = useVisibleMoviesQuantity();

  useEffect(() => {
    const moviesToShow = movies.slice(0, initialQuantity);
    setVisibleMovies(moviesToShow);
  }, [movies]);

  const onAddMoviesClick = () => {
    const newArrayLength = visibleMovies.length + addQuantity;
    const possibleCutLength = newArrayLength < movies.length ? newArrayLength : movies.length;
    const moviesToShow = movies.slice(0, possibleCutLength);
    setVisibleMovies(moviesToShow);
  };

  return (
    <>
      <MoviesCardList
        isEmpty={movies === MOVIES_EMPTY}
        visibleMovies={visibleMovies}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        savedMoviesId={savedMoviesId}
        isSavedRoute={isSavedRoute}
      />
      {compareIfBasicArrayBigger({
        basicLength: movies.length, comparableLength: visibleMovies.length,
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
