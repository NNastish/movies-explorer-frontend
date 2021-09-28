import React, { useState, useEffect, useRef } from 'react'
import SearchForm from "../SearchForm/SearchForm";
import {useLocation} from "react-router-dom";
import {findEndPoint, getFilmsFilteredByDuration, getFilmsFilteredByKey, showError, sleep} from "../../../utils/utils";
import { getBaseFilms } from "../../../utils/MoviesApi";
import MoviesViewController from "../MoviesViewController";
import {SHORT_FILM_DURATION_LIMIT} from "../../../utils/constants";

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
                />
            }
        </>
    )
}
