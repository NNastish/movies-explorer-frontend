import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import { BASE_URL_YANDEX } from "../../../utils/MoviesApi";
// import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ yandexDb, baseFilms, searchQuery }) {

    return (
        <section className='movies-card'>
            <div className='movies-card__list'>
                {console.log(baseFilms)}
                { baseFilms.map((film, index) => (
                    <MoviesCard
                        key={`${film?.id}${index}`}
                        title={film?.nameRU}
                        dbSource={yandexDb}
                        duration={film?.duration}
                        imageLink={`${BASE_URL_YANDEX}${film?.image?.url}`}
                        trailerLink={film?.trailerLink}
                    />
                ))}
            </div>
            <button className='movies-card__button' type='button'>Ещё</button>
        </section>
    )
}
