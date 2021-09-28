import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ films, addNewElements, isShortFilmsRequired, shortFilms }) {
    const renderMovies = (movies) => {
        return movies.map((movie) => (
            <MoviesCard
                key={movie.id}
                film={movie}
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
