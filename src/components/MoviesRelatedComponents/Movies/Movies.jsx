import React, { useState, useEffect, useRef, useMemo } from 'react'
import SearchForm from "../SearchForm/SearchForm";
import {useLocation} from "react-router-dom";
import {findEndPoint, getFilmsFilteredByDuration, getFilmsFilteredByKey, showError, sleep} from "../../../utils/utils";
import { getBaseFilms } from "../../../utils/MoviesApi";
import MoviesViewController from "../MoviesViewController";
import {SHORT_FILM_DURATION_LIMIT} from "../../../utils/constants";
import * as api from '../../../utils/MainApi';
import { BASE_URL_YANDEX } from '../../../utils/MoviesApi';
import { useVisibleMoviesQuantity } from '../../../utils/customHooks';

export default function Movies({ saveMovie, deleteMovie, beatFilms }) {
    const [areFilmsQueried, setAreFilmsQueried] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isShortFilmRequired, setIsShortFilmRequired] = useState(false);
    const [preloaderState, setPreloaderState] = useState(false);
    const [films, setFilms] = useState([]);
    const [shortFilms, setShortFilms] = useState([]);
    const [isAddAvailable, setIsAddAvailable] = useState(true);
    const { initialQuantity, addQuantity } = useVisibleMoviesQuantity();
    const [moviesRequiredNumber, setMoviesRequiredNumber] = useState(initialQuantity);

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
                searchFilms(beatFilms)
            })
            .finally(() => {
                setPreloaderState(false);
            })
    }, [searchPhrase])

    const defineMovie = () => {
        return isShortFilmRequired ? shortFilms : films;
    }

    const checkMovieArray = () => defineMovie() || [];

    const moviesToShow = checkMovieArray().slice(0, moviesRequiredNumber);

    const handleAddButton = () => {
        console.log('add');
        if (moviesRequiredNumber > defineMovie().length) {
            setIsAddAvailable(false);
        } else {
            setMoviesRequiredNumber(moviesRequiredNumber + addQuantity);
            setIsAddAvailable(true);
        }
    }

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
                    films={moviesToShow}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    changeVisibleMovies={handleAddButton}
                    isAddAvailable={isAddAvailable}
                />
            }
        </>
    )
}
