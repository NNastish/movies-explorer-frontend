import React, { useContext, useEffect, useState } from 'react';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import {
  findEndPoint,
  getFilmsFilteredByKey, showError,
  getShortFilms,
} from '../../utils/utils';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import * as mainApi from '../../utils/MainApi';
import { getBaseFilms } from '../../utils/MoviesApi';
import { MOVIES_EMPTY } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MovieController({ films }) {
  const [movies, setMovies] = useState(films);
  const [fullMovies, setFullMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedFullMovies, setSavedFullMovies] = useState([]);
  const [savedShortMovies, setSavedShortMovies] = useState([]);
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
    let differentId;
    if (!movie.owner) {
      differentId = savedMovies.filter((film) => film.movieId === movie.id)[0]._id;
    }
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
    query, moviesToFilter,
    saveFullMovies, saveShortMovies,
  }) => {
    const filteredByQuery = getFilmsFilteredByKey({ key: query, films: moviesToFilter });
    saveFullMovies(filteredByQuery);
    const shortFilms = getShortFilms({ movies: filteredByQuery });
    saveShortMovies(shortFilms);
    return { filteredFullMovies: filteredByQuery, filteredShortMovies: shortFilms };
  };

  async function submitSearchMovies(query) {
    try {
      setIsLoading(true);
      setIsErrorHappened(false);
      setIsNotFound(false);
      let localMovies = JSON.parse(localStorage.getItem('movies'));
      if (!localMovies) {
        const importMovies = await getBaseFilms();
        localStorage.setItem('movies', JSON.stringify(importMovies));
        localMovies = importMovies;
      }
      const { filteredFullMovies, filteredShortMovies } = setActualMovies({
        query,
        moviesToFilter: localMovies,
        saveFullMovies: setFullMovies,
        saveShortMovies: setShortMovies,
      });
      if (moviesToggle) {
        setMovies(filteredShortMovies);
        if (!filteredShortMovies || !filteredShortMovies.length) {
          setIsNotFound(true);
        }
      } else {
        setMovies(filteredFullMovies);
        if (!filteredFullMovies || !filteredFullMovies.length) {
          setIsNotFound(true);
        }
      }
      localStorage.setItem('searchedMovies', JSON.stringify(filteredFullMovies));
    } catch (err) {
      showError(err);
      setIsErrorHappened(true);
    } finally {
      setIsLoading(false);
    }
  }

  const submitSearchSavedMovies = (query) => {
    setSavedNotFound(false);
    const { filteredFullMovies, filteredShortMovies } = setActualMovies({
      query,
      moviesToFilter: savedMovies,
      saveFullMovies: setSavedFullMovies,
      saveShortMovies: setSavedShortMovies,
    });
    if (savedMoviesToggle) {
      setQueriedSavedMovies(filteredShortMovies);
      if (!filteredShortMovies || !filteredShortMovies.length) {
        setSavedNotFound(true);
      }
    } else {
      setQueriedSavedMovies(filteredFullMovies);
      if (!filteredFullMovies || !filteredFullMovies.length) {
        setSavedNotFound(true);
      }
    }
  };

  // set Saved Movies
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    mainApi.getSavedMovies(token)
      .then((saved) => {
        const ownedMovies = saved.filter((movie) => movie.owner._id === currentUser._id);
        setSavedMovies(ownedMovies);
        setQueriedSavedMovies(ownedMovies);
        setSavedMoviesId(ownedMovies.map((movie) => movie.movieId));
      })
      .catch(showError);
  }, []);

  useEffect(() => {
    setIsNotFound(false);
    setSavedNotFound(false);
  }, [currentLocation]);

  useEffect(() => {
    if (savedMoviesToggle) {
      setQueriedSavedMovies(savedShortMovies);
    } else {
      setQueriedSavedMovies(savedFullMovies);
    }
  }, [savedMoviesToggle]);

  useEffect(() => {
    if (localStorage.getItem('searchedMovies')) {
      if (moviesToggle) {
        setMovies(shortMovies);
      } else {
        setMovies(fullMovies);
      }
    }
  }, [moviesToggle]);

  useEffect(() => {
    setMovies(films);
  }, [films]);

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
