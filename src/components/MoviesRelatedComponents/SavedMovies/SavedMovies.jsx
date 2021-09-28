import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as api from '../../../utils/MainApi'
import {findEndPoint, getFilmsFilteredByDuration, getFilmsFilteredByKey, showError, sleep} from "../../../utils/utils";
import {SHORT_FILM_DURATION_LIMIT} from "../../../utils/constants";
import SearchForm from "../SearchForm/SearchForm";
import MoviesViewController from "../MoviesViewController";
import { BASE_URL_YANDEX } from '../../../utils/MoviesApi';

export default function SavedMovies() {
    const [allFilms, setAllFilms] = useState([]);
    const [areFilmsQueried, setAreFilmsQueried] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isShortFilmRequired, setIsShortFilmRequired] = useState(false);
    const [preloaderState, setPreloaderState] = useState(false);
    const [films, setFilms] = useState([]);
    const [shortFilms, setShortFilms] = useState([]);
    const [savedMovieId, setSavedMovieId] = useState('');
    const currentLocation = useLocation();

    function searchFilms(films) {
        const filteredByKey = getFilmsFilteredByKey(searchPhrase, films)
        setFilms(filteredByKey);
        const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, filteredByKey);
        setShortFilms(filteredByDuration);
    }

    async function saveMovie(movie) {
        try {
            const { country, director, duration, year, description, image, trailerLink: trailer, nameRU, nameEN, id: movieId } = movie;
            const imageUrl = `${BASE_URL_YANDEX}${image?.url}`
            const thumbnail = `${BASE_URL_YANDEX}${image?.formats?.thumbnail?.url}`
            const movieToSave = { country, director, duration, year, description, image: imageUrl, trailer, nameEN, nameRU, movieId, thumbnail };
            const savedMovie = await api.saveMovie(movieToSave);
            // if (savedMovie) {
            //     setSavedMovieId(savedMovie._id);
            // }
        } catch (e) {
            showError(e);
        }
    }

    async function deleteMovie(movieId) {
        try {
            const deleted = await api.deleteMovie(movieId);
            if (deleted) {
                const newFilms = allFilms.filter(film => film._id !== movieId);
                console.log(newFilms);
                setAllFilms(newFilms);
            }
        } catch (e) {
            showError(e);
        }
    }

    // useEffect(() => {
    //     setPreloaderState(true);
    //     // setFilms(all);
    //     // setShortFilms(getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, allFilms));
    //     sleep(1500)
    //         .then(() => {
    //             searchFilms(allFilms)
    //         })
    //         .finally(() => {
    //             setPreloaderState(false);
    //         })
    // }, [searchPhrase]);

    useEffect(() => {
        api.getSavedMovies()
            .then((films) => {
                setAllFilms(films)
                setFilms(films);
                const filtered = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, films);
                setShortFilms(filtered);
            })
            .catch(showError)
            .finally(() => {

            })
    }, [currentLocation])

    return (
        <>
            <SearchForm
                handleSearchPhraseChange={setSearchPhrase}
                handleFilterChange={setIsShortFilmRequired}
                isFilterOn={isShortFilmRequired}
                setIsSearched={setAreFilmsQueried}
            />
            <MoviesViewController
                    preloaderState={preloaderState}
                    films={allFilms}
                    shortFilms={shortFilms}
                    isShortFilmsRequired={isShortFilmRequired}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                />
        </>
    )
}
