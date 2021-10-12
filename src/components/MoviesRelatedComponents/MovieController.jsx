import React, { useContext, useEffect, useState } from 'react';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import { findEndPoint, getFilmsFilteredByDuration, getFilmsFilteredByKey, showError } from '../../utils/utils';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import * as mainApi from '../../utils/MainApi';
import getBaseFilms from '../../utils/MoviesApi';
import { MOVIES_EMPTY } from '../../utils/constants';

export default function MovieController() {
    const [movies, setMovies] = useState(
        localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []
    );
    const [movieQuery, setMovieQuery] = useState('');
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMovieQuery, setSavedMovieQuery] = useState('');
    const [savedMoviesId, setSavedMoviesId] = useState([]);
    const [queriedSavedMovies, setQueriedSavedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorHappened, setIsErrorHappened] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [moviesToggle, setMoviesToggle] = useState(false);
    const [savedMoviesToggle, setSavedMoviesToggle] = useState(false);
    const currentLocation = useContext(CurrentLocationContext);
    const isSavedRoute = findEndPoint(currentLocation) === '/saved-movies';

    const deleteMovie = (movie) => {
        console.log('deleteMovie: ', movie);
        console.log('is _id there?');
        mainApi.deleteMovie(movie._id)
        .then((deleted) => {
            console.log('server answer on delete: ', deleted);
            setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id != deleted._id));
            setSavedMoviesId(savedMoviesId.filter((movieId) => movieId != deleted.movieId));
        })
        .catch(showError);
    };

    const saveMovie = (movie) => {
        console.log('saveMovie: ', movie);
        console.log('is id field here?');
        mainApi.saveMovie(movie)
        .then((saved) => {
            console.log('server answer on save: ', saved);
            console.log('is movieId field there?');
            setSavedMovies([...savedMovies, saved]);
            setSavedMoviesId([...savedMoviesId, saved.movieId]);
        })
        .catch(showError);
    };

    const setActualMovies = ({ query, movies, toggle, fn }) => {
        const searchedMovies = getFilmsFilteredByKey(query, movies);
        const queriedMovies = getFilmsFilteredByDuration({ movies: searchedMovies, areShort: toggle}); 
        fn(queriedMovies);
        return {searchedMovies, queriedMovies};
    };

    const submitSearchMovies = async (query) => {
        console.log('submitSearchMovies');
        setIsLoading(true);
        setIsErrorHappened(false);
        setIsNotFound(false);
        setMovieQuery(query);
        try {
            let localMovies = JSON.parse(localStorage.getItem('movies'));
            if (!localMovies) {
                const importMovies = await getBaseFilms();
                localStorage.setItem('movies', JSON.stringify(importMovies));
                localMovies = importMovies;
            }
            const { searchedMovies, queriedMovies} = setActualMovies({
                query: query, movies: localMovies, toggle: moviesToggle, fn: setMovies
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
    };

    const submitSearchSavedMovies = (query) => {
        console.log('submitSearchSavedMovies');
        setSavedMovieQuery(query);
        setActualMovies({
            query: query, movies: savedMovies, toggle: savedMoviesToggle, fn: setQueriedSavedMovies
        });
    };

    // set Saved Movies
    useEffect(() => {
        mainApi.getSavedMovies()
        .then((movies) => {
            // на сервере уже должна происходить сортировка
            console.log('mounting movieController', movies, movies.data);
            setSavedMovies(movies);
            setSavedMoviesId(movies.map((movie) => movie.movieId));
        })
        .catch(showError);
    }, []);

    useEffect(() => {
        setIsNotFound(false);
    }, [currentLocation]);

    useEffect(() => {
        setActualMovies({
            query: savedMovieQuery, movies: savedMovies, toggle: savedMoviesToggle, fn: setQueriedSavedMovies
        });
    }, [savedMoviesToggle]);

    useEffect(() => {
        if (localStorage.getItem('searchedMovies')) {
            setActualMovies({
                query: movieQuery, movies: movies, toggle: moviesToggle, fn: setMovies
            });
        }
    }, [moviesToggle]);

    return isSavedRoute ? 
    <SavedMovies
        movies={queriedSavedMovies.length ? queriedSavedMovies : MOVIES_EMPTY}
        deleteMovie={deleteMovie}
        submitSearch={submitSearchSavedMovies}
        handleToggleChange={setSavedMoviesToggle}
    /> : 
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
    />;
}
