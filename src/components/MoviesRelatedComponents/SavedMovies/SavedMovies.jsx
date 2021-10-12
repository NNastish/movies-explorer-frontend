import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesView from '../MoviesView';
import Message from '../../Message/Message';
import { NOT_FOUND_TEXT } from '../../../utils/constants';

export default function SavedMovies({
  movies, deleteMovie, submitSearch, handleToggleChange, isSavedRoute, isNotFound,
}) {
  return (
    <section className="movies-card">
      <SearchForm
        submitSearch={submitSearch}
        handleToggleChange={handleToggleChange}
      />
      {isNotFound ? <Message text={NOT_FOUND_TEXT} isError={false} /> : null}
      <MoviesView
        isSavedRoute={isSavedRoute}
        movies={movies}
        deleteMovie={deleteMovie}
        isNotFound={isNotFound}
      />
    </section>
  );
}
