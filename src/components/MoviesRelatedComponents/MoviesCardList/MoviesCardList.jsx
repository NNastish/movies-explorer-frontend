import React, {useEffect, useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {BASE_URL_YANDEX} from "../../../utils/MoviesApi";

export default function MoviesCardList({yandexDb, moviesToShow, preloaderState, setFilmNotFound}) {
    // TODO: make param in slice by sizeHook
    // const [moviesBlock, setMoviesBlock] = useState(moviesToShow.slice(9));
    function handleView() {
        if (!moviesToShow) {
            return;
        }
        if (!moviesToShow.length && !preloaderState) {
            setFilmNotFound(true);
        } else {
            setFilmNotFound(false);
            return moviesToShow.map((film, index) => (
                <MoviesCard
                    key={`${film?.id}${index}`}
                    title={film?.nameRU}
                    dbSource={yandexDb}
                    duration={film?.duration}
                    imageLink={`${BASE_URL_YANDEX}${film?.image?.url}`}
                    trailerLink={film?.trailerLink}
                />
            ))
        }
    }

    return (
        <section className='movies-card'>
            <div className='movies-card__list'>
                {handleView()}
            </div>
            <button className='movies-card__button' type='button'>Ещё</button>
        </section>
    )
}
