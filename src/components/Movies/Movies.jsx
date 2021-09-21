import React, { useState, useEffect } from 'react'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useLocation} from "react-router-dom";
import {findEndPoint} from "../../utils/utils";
import { getBaseFilms } from "../../utils/MoviesApi";

export default function Movies() {
    // temporary variable
    const [isYandexDb, setIsYandexDb] = useState(true);
    const [baseFilms, setBaseFilms] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        filtered: false,
        request: ''
    });

    const currentLocation = useLocation();


    useEffect(() => {
        const endPoint = findEndPoint(currentLocation);
        if (endPoint === '/movies') {
            setIsYandexDb(true);
        } else {
            setIsYandexDb(false);
        }
    }, [currentLocation])


    // TODO: add check if saved in localstorage then take from there else query server.
    useEffect(() => {
        getBaseFilms()
            .then((films) => setBaseFilms(films))
            .catch(console.err);
    }, [])

    return (
        <>
            <SearchForm
                query={searchQuery}
                handleSearchQueryChange={setSearchQuery}
            />
            <MoviesCardList
                yandexDb={isYandexDb}
                baseFilms={baseFilms.slice(0, 9)}
                searchQuery={searchQuery}
            />
        </>
    )
}
