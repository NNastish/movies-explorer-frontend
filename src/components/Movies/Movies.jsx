import React, { useState, useEffect } from 'react'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useLocation} from "react-router-dom";
import {findEndPoint} from "../../utils/utils";

export default function Movies() {
    // temporary variable
    const [isYandexDb, setIsYandexDb] = useState(true);

    const currentLocation = useLocation();

    useEffect(() => {
        const endPoint = findEndPoint(currentLocation);
        if (endPoint === '/movies') {
            setIsYandexDb(true);
        } else {
            setIsYandexDb(false);
        }
    }, [currentLocation])

    return (
        <>
            <SearchForm />
            <MoviesCardList yandexDb={isYandexDb}/>
        </>
    )
}
