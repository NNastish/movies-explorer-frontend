import React, { useState, useEffect } from 'react';
import {
  getFilmsFilteredByDuration, getFilmsFilteredByKey, sleep,
} from '../../../utils/utils';
import { SHORT_FILM_DURATION_LIMIT } from '../../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import MoviesViewController from '../MoviesViewController';

export default function SavedMovies({ deleteMovie, savedFilms }) {
  const [areFilmsQueried, setAreFilmsQueried] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [isShortFilmsRequired, setIsShortFilmRequired] = useState(false);
  const [preloaderState, setPreloaderState] = useState(false);
  const [films, setFilms] = useState(savedFilms);
  const [shortFilms, setShortFilms] = useState([]);
  const [moviesToShow, setMoviewToShow] = useState([]);

  const defineMovie = () => (isShortFilmsRequired ? shortFilms : films);

  function searchFilms(baseFilms) {
    const filteredByKey = getFilmsFilteredByKey(searchPhrase, baseFilms);
    setFilms(filteredByKey);
    const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, filteredByKey);
    setShortFilms(filteredByDuration);
    setMoviewToShow(defineMovie());
  }

  useEffect(() => {
    setPreloaderState(true);
    sleep(1500)
      .then(() => {
        searchFilms(savedFilms);
      })
      .finally(() => {
        setPreloaderState(false);
      });
  }, [searchPhrase]);

  useEffect(() => {
    setFilms(savedFilms);
    const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, savedFilms);
    setShortFilms(filteredByDuration);
    setMoviewToShow(savedFilms);
  }, []);

  return (
    <>
      <SearchForm
        handleSearchPhraseChange={setSearchPhrase}
        handleFilterChange={setIsShortFilmRequired}
        isFilterOn={isShortFilmsRequired}
        setIsSearched={setAreFilmsQueried}
      />
      {
        areFilmsQueried && (
        <MoviesViewController
          preloaderState={preloaderState}
          films={moviesToShow}
          deleteMovie={deleteMovie}
        />
        )
      }
    </>
  );
}
