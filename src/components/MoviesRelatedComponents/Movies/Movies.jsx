import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Message from '../../Message/Message';
import MoviesView from '../MoviesView';
import { NOT_FOUND_TEXT, REQUEST_ERROR } from '../../../utils/constants';
import Preloader from '../Preloader/Preloader';

export default function Movies({
  isLoading, isNotFound, isErrorHappened, submitSearch, handleToggleChange,
  movies, savedMoviesId, saveMovie, deleteMovie, isSavedRoute,
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
        isSavedRoute={isSavedRoute}
        movies={movies}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        savedMoviesId={savedMoviesId}
      />
    </section>
  );
}
