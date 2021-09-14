import React, { useState } from 'react';
import './MoviesCard.css';
import movie from '../../images/movie.jpg'

export default function MoviesCard({ dbSource }) {
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const determineButtonClass = () => {
        if (dbSource && isButtonClicked) {
            return 'movies__button-add'
        }
        if (dbSource && !isButtonClicked) {
            return 'movies__button';
        }
        if (!dbSource) {
            return 'movies__button-delete';
        }
    }

    const changeButtonState = () => {
        setIsButtonClicked(!isButtonClicked);
    }

    return (
        <div className={'movies'}>
            <div className={'movies__info'}>
                <h1 className={'movies__title'}>В погоне за Бенкси</h1>
                <p className={'movies__time'}>27 минут</p>
                <button
                    className={determineButtonClass()}
                    onClick={changeButtonState}
                >
                    {dbSource && !isButtonClicked ? 'Сохранить' : ''}
                </button>
                {/*<button className={'movies__button-add'}></button>*/}
                {/*<button className={'movies__button-delete'}></button>*/}

            {/* Сейчас состояния реализованы как 3 разные кнопки, далее с помощью функционала поменяю это на добавление модификатора   */}

            </div>
            <img className={'movies__image'} alt={'Фильм'} src={movie}/>

        </div>
    )
}
