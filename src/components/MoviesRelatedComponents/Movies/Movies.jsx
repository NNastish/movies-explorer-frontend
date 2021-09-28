import React, { useState, useEffect, useRef } from 'react'
import SearchForm from "../SearchForm/SearchForm";
import {useLocation} from "react-router-dom";
import {findEndPoint, getFilmsFilteredByDuration, getFilmsFilteredByKey, showError, sleep} from "../../../utils/utils";
import { getBaseFilms } from "../../../utils/MoviesApi";
import MoviesViewController from "../MoviesViewController";
import {SHORT_FILM_DURATION_LIMIT} from "../../../utils/constants";
import * as api from '../../../utils/MainApi';
import { BASE_URL_YANDEX } from '../../../utils/MoviesApi';

export default function Movies() {
    const [allFilms, setAllFilms] = useState([]);
    const [areFilmsQueried, setAreFilmsQueried] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isShortFilmRequired, setIsShortFilmRequired] = useState(false);
    const [preloaderState, setPreloaderState] = useState(false);
    const [films, setFilms] = useState([]);
    const [shortFilms, setShortFilms] = useState([]);
    const currentLocation = useLocation();

    // TODO: add check if saved in localstorage then take from there else query server.
    useEffect(() => {
        getBaseFilms()
            .then((films) => setAllFilms(films))
            .catch(showError)
            .finally(() => {
            })
    }, []);

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
            // if (deleted) {
            //     setSavedMovieId('');
            // }
        } catch (e) {
            showError(e);
        }
    }


    function searchFilms(films) {
        const filteredByKey = getFilmsFilteredByKey(searchPhrase, films)
        setFilms(filteredByKey);
        const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, filteredByKey);
        setShortFilms(filteredByDuration);
    }

    useEffect(() => {
        setPreloaderState(true);
        setFilms([]);
        setShortFilms([]);
        sleep(1500)
            .then(() => {
                searchFilms(allFilms)
            })
            .finally(() => {
                setPreloaderState(false);
            })
    }, [searchPhrase])

    return (
        <>
            <SearchForm
                handleSearchPhraseChange={setSearchPhrase}
                handleFilterChange={setIsShortFilmRequired}
                isFilterOn={isShortFilmRequired}
                setIsSearched={setAreFilmsQueried}
            />
            {
                areFilmsQueried && <MoviesViewController
                    preloaderState={preloaderState}
                    films={films}
                    shortFilms={shortFilms}
                    isShortFilmsRequired={isShortFilmRequired}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                />
            }
        </>
    )
}
