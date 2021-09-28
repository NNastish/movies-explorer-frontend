import React from 'react';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

const MoviesViewController = ({ preloaderState, films, shortFilms, isShortFilmsRequired }) => {
    function defineMovie() {
        return isShortFilmsRequired ? shortFilms : films;
    }

    function isPreloader() {
        const notFound = !films || defineMovie().length === 0;
        return preloaderState || notFound;
    }

    return (
        isPreloader() ?
            <Preloader
                preloaderState={preloaderState}
            /> :
            <MoviesCardList
                films={films}
                shortFilms={shortFilms}
                isShortFilmsRequired={isShortFilmsRequired}
                addNewElements={() => console.log('add')}
            />
    )
}

export default MoviesViewController;
