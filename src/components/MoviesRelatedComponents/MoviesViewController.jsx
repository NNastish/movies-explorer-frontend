import React, {useState, useEffect, useRef} from 'react';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {SHORT_FILM_DURATION_LIMIT} from "../../utils/constants";
import Preloader from "./Preloader/Preloader";
import {sleep} from "../../utils/utils";

const MoviesViewController = ({
                                  allFilms,
                                  endPoint,
                                  searchPhrase,
                                  isShortFilmRequired,
                                  areFilmsQueried,
                              }) => {
    const [films, setFilms] = useState([]);
    const [shortFilms, setShortFilms] = useState([]);
    const [filmNotFound, setFilmNotFound] = useState(false);
    // const mounted = useRef(false);
    const [preloaderState, setPreloaderState] = useState();

    function getFilteredByKey(key) {
        if (!allFilms || !key.length) {
            return;
        }
        return allFilms.filter((film) => {
            const hasKeyInRussianName = film?.nameRU && film?.nameRU.includes(key);
            const hasKeyInEnglishName = film?.nameEN && film?.nameEN.includes(key);
            const hasKeyInDescription = film?.description.includes(key);
            if (hasKeyInDescription || hasKeyInEnglishName || hasKeyInRussianName) {
                return film;
            }
        });
    }

    function getFilteredByDuration(timeLimit, filteredByKey) {
        if (!filteredByKey) {
            return;
        }
        return filteredByKey.filter((film) => film.duration <= timeLimit);
    }

    function searchFilms() {
        const filteredByKey = getFilteredByKey(searchPhrase)
        setFilms(filteredByKey);
        const filteredByDuration = getFilteredByDuration(SHORT_FILM_DURATION_LIMIT, filteredByKey);
        setShortFilms(filteredByDuration);
    }

    useEffect(() => {
        setPreloaderState(true);
        setFilms([]);
        setShortFilms([]);
        sleep(1500)
            .then(() => {
                searchFilms()
            })
            .finally(() => {
                setPreloaderState(false);
            })
    }, [searchPhrase])

    function defineMoviesToShow() {
        return isShortFilmRequired ? shortFilms : films;
    }

    return (
        <>
            <Preloader
                preloaderState={preloaderState}
                notFound={filmNotFound}
            />
            {areFilmsQueried &&
            <MoviesCardList
                yandexDb={true}
                moviesToShow={defineMoviesToShow()}
                preloaderState={preloaderState}
                setFilmNotFound={setFilmNotFound}
            />
            }
        </>
    )
}
;

export default MoviesViewController;
