import React, { useContext, useEffect, useState } from 'react';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import {
  findEndPoint, getFilmsFilteredByDuration, getFilmsFilteredByKey, showError,
} from '../../utils/utils';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import * as mainApi from '../../utils/MainApi';
import { getBaseFilms } from '../../utils/MoviesApi';
import { MOVIES_EMPTY } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MovieController({ films }) {
  const [movies, setMovies] = useState(films);
  // const [movieQuery, setMovieQuery] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  // const [savedMovieQuery, setSavedMovieQuery] = useState('');
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  const [queriedSavedMovies, setQueriedSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorHappened, setIsErrorHappened] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [savedNotFound, setSavedNotFound] = useState(false);
  const [moviesToggle, setMoviesToggle] = useState(false);
  const [savedMoviesToggle, setSavedMoviesToggle] = useState(false);
  const currentLocation = useContext(CurrentLocationContext);
  const currentUser = useContext(CurrentUserContext);
  const isSavedRoute = findEndPoint(currentLocation) === '/saved-movies';

  const deleteMovie = (movie) => {
    const token = localStorage.getItem('jwt');
    const differentId = savedMovies.filter((film) => film.movieId === movie.id)[0]._id;
    const id = movie.owner ? movie._id : differentId;
    mainApi.deleteMovie(id, token)
      .then((deleted) => {
        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== deleted._id));
        setSavedMoviesId(savedMoviesId.filter((movieId) => movieId !== deleted.movieId));
      })
      .catch(showError);
  };

  const saveMovie = (movie) => {
    const token = localStorage.getItem('jwt');
    mainApi.saveMovie(movie, token)
      .then((saved) => {
        setSavedMovies([...savedMovies, saved]);
        setSavedMoviesId([...savedMoviesId, saved.movieId]);
      })
      .catch(showError);
  };

  const setActualMovies = ({
    query, toFilter, toggle, fn,
  }) => {
    let searchedMovies = [];
    if (query) {
      searchedMovies = getFilmsFilteredByKey({ key: query, films: toFilter });
    }
    const movieToFilter = searchedMovies.length ? searchedMovies : toFilter;
    const queriedMovies = getFilmsFilteredByDuration({
      movies: movieToFilter, areShort: toggle,
    });
    fn(queriedMovies);
    return { searchedMovies, queriedMovies };
  };

  async function submitSearchMovies(query) {
    try {
      setIsLoading(true);
      setIsErrorHappened(false);
      setIsNotFound(false);
      // setMovieQuery(query);
      let localMovies = JSON.parse(localStorage.getItem('movies'));
      if (!localMovies) {
        const importMovies = await getBaseFilms();
        localStorage.setItem('movies', JSON.stringify(importMovies));
        localMovies = importMovies;
      }
      const { searchedMovies, queriedMovies } = setActualMovies({
        query, toFilter: localMovies, toggle: moviesToggle, fn: setMovies,
      });
      localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      if (!queriedMovies || queriedMovies.length === 0) {
        setIsNotFound(true);
      }
    } catch (err) {
      showError(err);
      setIsErrorHappened(true);
    } finally {
      setIsLoading(false);
    }
  }

  const submitSearchSavedMovies = (query) => {
    setSavedNotFound(false);
    // setSavedMovieQuery(query);
    const { searchedMovies, queriedMovies } = setActualMovies({
      query, toFilter: savedMovies, toggle: savedMoviesToggle, fn: setQueriedSavedMovies,
    });
    if (!searchedMovies || !queriedMovies || !searchedMovies.length || !queriedMovies.length) {
      setSavedNotFound(true);
    }
  };

  // set Saved Movies
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    mainApi.getSavedMovies(token)
      .then((saved) => {
        const ownedMovies = saved.filter((movie) => movie.owner._id === currentUser._id);
        setSavedMovies(ownedMovies);
        setSavedMoviesId(ownedMovies.map((movie) => movie.movieId));
      })
      .catch(showError);
  }, []);

  useEffect(() => {
    setIsNotFound(false);
    setSavedNotFound(false);
  }, [currentLocation]);

  useEffect(() => {
    setActualMovies({
      query: '',
      toFilter: savedMovies,
      toggle: savedMoviesToggle,
      fn: setQueriedSavedMovies,
    });
  }, [savedMoviesToggle]);

  useEffect(() => {
    if (localStorage.getItem('searchedMovies')) {
      setActualMovies({
        query: '', toFilter: movies, toggle: moviesToggle, fn: setMovies,
      });
    }
  }, [moviesToggle]);

  return isSavedRoute
    ? (
      <SavedMovies
        movies={queriedSavedMovies.length ? queriedSavedMovies : MOVIES_EMPTY}
        deleteMovie={deleteMovie}
        submitSearch={submitSearchSavedMovies}
        handleToggleChange={setSavedMoviesToggle}
        isSavedRoute={isSavedRoute}
        isNotFound={savedNotFound}
      />
    )
    : (
      <Movies
        isLoading={isLoading}
        isNotFound={isNotFound}
        isErrorHappened={isErrorHappened}
        submitSearch={submitSearchMovies}
        handleToggleChange={setMoviesToggle}
        movies={movies}
        savedMoviesId={savedMoviesId}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        isSavedRoute={isSavedRoute}
      />
    );
}
