import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {BASE_URL_YANDEX} from "../../../utils/MoviesApi";

export default function MoviesCardList({yandexDb, films, addNewElements, isShortFilmsRequired, shortFilms}) {
    const renderMovies = (films) => {
        return films.map((film, index) => (
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
    return (
        <section className='movies-card'>
            <div className='movies-card__list'>
                {
                    isShortFilmsRequired ? renderMovies(shortFilms) : renderMovies(films)
                }
            </div>
            <button className='movies-card__button' type='button' onClick={() => addNewElements()}>Ещё</button>
        </section>
    )
}
