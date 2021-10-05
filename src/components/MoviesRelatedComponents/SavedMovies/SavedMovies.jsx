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

export default function SavedMovies({ saveMovie, deleteMovie, savedFilms }) {
    // const [allFilms, setAllFilms] = useState([]);
    const [areFilmsQueried, setAreFilmsQueried] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isShortFilmRequired, setIsShortFilmRequired] = useState(false);
    const [preloaderState, setPreloaderState] = useState(false);
    const [films, setFilms] = useState(savedFilms);
    const [shortFilms, setShortFilms] = useState([]);
    const currentLocation = useContext(CurrentLocationContext);
    const currentUser = useContext(CurrentUserContext);

    function searchFilms(films) {
        const filteredByKey = getFilmsFilteredByKey(searchPhrase, films)
        setFilms(filteredByKey);
        const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, filteredByKey);
        setShortFilms(filteredByDuration);
    }

    // async function saveMovie(movie) {
    //     try {
    //         const { country, director, duration, year, description, image, trailerLink: trailer, nameRU, nameEN, id: movieId } = movie;
    //         const imageUrl = `${BASE_URL_YANDEX}${image?.url}`
    //         const thumbnail = `${BASE_URL_YANDEX}${image?.formats?.thumbnail?.url}`
    //         const movieToSave = { 
    //             country: country ?? 'undefined', 
    //             director: director ?? 'undefined', 
    //             duration: duration, 
    //             year: year ?? 'undefined', 
    //             description: description ?? 'undefined', 
    //             image: imageUrl, 
    //             trailer: trailer, 
    //             nameEN: nameEN ?? 'undefined', 
    //             nameRU: nameRU ?? 'undefined', 
    //             movieId: movieId, 
    //             thumbnail: thumbnail 
    //         };
    //         const token = localStorage.getItem('jwt');
    //         await api.saveMovie(movieToSave, token)
    //     } catch (e) {
    //         showError(e);
    //     }
    // }

    // async function deleteMovie(movieId) {
    //     try {
    //         const token = localStorage.getItem('jwt');
    //         const deleted = await api.deleteMovie(movieId, token);
    //         if (deleted) {
    //             const newFilms = allFilms.filter(film => film._id !== movieId);
    //             setAllFilms(newFilms);
    //             searchPhrase === '' ? setFilms(newFilms) : setFilms(getFilmsFilteredByKey(searchPhrase, newFilms));
    //             const shortFilms = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, films);
    //             setShortFilms(shortFilms);
    //         }
    //     } catch (e) {
    //         showError(e);
    //     }
    // }

    useEffect(() => {
        setPreloaderState(true);
        // setFilms(all);
        // setShortFilms(getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, allFilms));
        sleep(1500)
            .then(() => {
                searchFilms(savedFilms)
            })
            .finally(() => {
                setPreloaderState(false);
            })
    }, [searchPhrase]);

    useEffect(() => {
        const filteredByDuration = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, savedFilms);
        setShortFilms(filteredByDuration);
    }, [])

    // useEffect(() => {
    //     const token = localStorage.getItem('jwt');
    //     api.getSavedMovies(token)
    //         .then((movies) => {
    //             // console.log(currentUser);
    //             const owningFilms = movies.filter((film) => film.owner._id === currentUser._id);
    //             setAllFilms(owningFilms);
    //             setFilms(owningFilms);
    //             const filtered = getFilmsFilteredByDuration(SHORT_FILM_DURATION_LIMIT, owningFilms);
    //             setShortFilms(filtered);
    //             console.log('owning', owningFilms);
    //             console.log('all', allFilms);
    //             console.log('full', films);
    //             console.log('short', shortFilms);
    //         })
    //         .catch(showError)
    //         .finally(() => {
    //         })
    // }, [currentLocation])

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
                    films={savedFilms}
                    shortFilms={shortFilms}
                    isShortFilmsRequired={isShortFilmRequired}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                />
        </>
    )
}
