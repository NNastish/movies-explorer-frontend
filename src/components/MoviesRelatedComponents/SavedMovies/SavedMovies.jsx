import React, { useState, useEffect, useMemo, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import * as api from '../../../utils/MainApi'
import {findEndPoint, getFilmsFilteredByDuration, getFilmsFilteredByKey, showError, sleep} from "../../../utils/utils";
import {SHORT_FILM_DURATION_LIMIT} from "../../../utils/constants";
import SearchForm from "../SearchForm/SearchForm";
import MoviesViewController from "../MoviesViewController";
import { BASE_URL_YANDEX } from '../../../utils/MoviesApi';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { CurrentLocationContext } from '../../../contexts/CurrentLocationContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ saveMovie, deleteMovie, savedFilms }) {
    const [areFilmsQueried, setAreFilmsQueried] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isShortFilmsRequired, setIsShortFilmRequired] = useState(false);
    const [preloaderState, setPreloaderState] = useState(false);
    const [films, setFilms] = useState(savedFilms);
    const [shortFilms, setShortFilms] = useState([]);
    const [moviesToShow, setMoviewToShow] = useState([]);

    function searchFilms(films) {
        const filteredByKey = getFilmsFilteredByKey(searchPhrase, films)
        setFilms(filteredByKey);
        const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, filteredByKey);
        setShortFilms(filteredByDuration);
        setMoviewToShow(defineMovie());
    }

    useEffect(() => {
        setPreloaderState(true);
        sleep(1500)
            .then(() => {
                searchFilms(savedFilms)
            })
            .finally(() => {
                setPreloaderState(false);
            })
    }, [searchPhrase]);

    useEffect(() => {
        setFilms(savedFilms);
        const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, savedFilms);
        setShortFilms(filteredByDuration);
        setMoviewToShow(savedFilms);
    }, [])

    const defineMovie = () => isShortFilmsRequired ? shortFilms : films;

    return (
        <>
            <SearchForm
                handleSearchPhraseChange={setSearchPhrase}
                handleFilterChange={setIsShortFilmRequired}
                isFilterOn={isShortFilmsRequired}
                setIsSearched={setAreFilmsQueried}
            />
            <MoviesViewController
                    preloaderState={preloaderState}
                    films={moviesToShow}
                    deleteMovie={deleteMovie}
            />
        </>
    )
}
