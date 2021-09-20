import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ yandexDb }) {
    return (
        <section className='movies-card'>
            <div className='movies-card__list'>
                <MoviesCard dbSource={yandexDb}/>
                <MoviesCard dbSource={yandexDb}/>
                <MoviesCard dbSource={yandexDb}/>
                <MoviesCard dbSource={yandexDb}/>
                <MoviesCard dbSource={yandexDb}/>
            </div>
            <button className='movies-card__button' type='button'>Ещё</button>
        </section>
    )
}
