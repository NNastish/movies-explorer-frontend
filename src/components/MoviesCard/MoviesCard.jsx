import React from 'react';
import './MoviesCard.css';
import movie from '../../images/movie.jpg'

export default function MoviesCard() {
    return (
        <div className={'movies'}>
            <div className={'movies__info'}>
                <h1 className={'movies__title'}>В погоне за Бенкси</h1>
                <p className={'movies__time'}>27 минут</p>
                <button className={'movies__button'}>Сохранить</button>
                {/*<button className={'movies__button-add'}></button>*/}
                {/*<button className={'movies__button-delete'}></button>*/}

            {/* Сейчас состояния реализованы как 3 разные кнопки, далее с помощью функционала поменяю это на добавление модификатора   */}

            </div>
            <img className={'movies__image'} alt={'Фильм'} src={movie}/>

        </div>
    )
}
