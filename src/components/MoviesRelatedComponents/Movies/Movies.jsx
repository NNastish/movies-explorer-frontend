import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Message from '../../Message/Message';
import {
  getFilmsFilteredByDuration, getFilmsFilteredByKey, sleep,
} from '../../../utils/utils';
import MoviesView from '../MoviesView';
import { SHORT_FILM_DURATION_LIMIT, NOT_FOUND_TEXT, REQUEST_ERROR } from '../../../utils/constants';
import { useVisibleMoviesQuantity } from '../../../utils/customHooks';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({
  isLoading, isNotFound, isErrorHappened, submitSearch, handleToggleChange,
  movies, savedMoviesId, saveMovie, deleteMovie,
}) {
  return (
    <section className="movies-card">
      <SearchForm
        submitSearch={submitSearch}
        handleToggleChange={handleToggleChange}
      />
      {isLoading ? <Preloader /> : null}
      {isNotFound ? <Message text={NOT_FOUND_TEXT} isError={false} /> : null}
      {isErrorHappened ? <Message text={REQUEST_ERROR} isError={true} /> : null}
      <MoviesView
        isSavedRoute={false}
        movies={movies}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        savedMoviesId={savedMoviesId}
      />
    </section>
  );
}
