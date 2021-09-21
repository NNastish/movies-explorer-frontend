import React, { useState, useEffect, useRef } from 'react'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useLocation} from "react-router-dom";
import {findEndPoint} from "../../../utils/utils";
import { getBaseFilms } from "../../../utils/MoviesApi";
import MoviesViewController from "../MoviesViewController";
import { sleep } from "../../../utils/utils";

export default function Movies() {
    const [allFilms, setAllFilms] = useState([]);
    const [areFilmsQueried, setAreFilmsQueried] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isShortFilmRequired, setIsShortFilmRequired] = useState(false);
    // const [preloaderState, setPreloaderState] = useState(false);

    const currentLocation = useLocation();

    // TODO: add check if saved in localstorage then take from there else query server.
    useEffect(() => {
        getBaseFilms()
            .then((films) => setAllFilms(films))
            .catch(console.err)
            .finally(() => {
            })
    }, [])

    return (
        <>
            <SearchForm
                handleSearchPhraseChange={setSearchPhrase}
                handleFilterChange={setIsShortFilmRequired}
                isFilterOn={isShortFilmRequired}
                setIsSearched={setAreFilmsQueried}
            />
            <MoviesViewController
                endPoint={findEndPoint(currentLocation)}
                allFilms={allFilms}
                searchPhrase={searchPhrase}
                isShortFilmRequired={isShortFilmRequired}
                areFilmsQueried={areFilmsQueried}
            />
        </>
    )
}
