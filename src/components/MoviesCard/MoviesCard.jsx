import React, { useState } from 'react';
import './MoviesCard.css';
import movie from '../../images/movie.jpg'

export default function MoviesCard({ dbSource, title, duration, imageLink, trailerLink }) {
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
                <h1 className={'movies__title'}>{title}</h1>
                {/*TODO: написать функцию правильно отображающую время*/}
                <p className={'movies__time'}>{`${duration} минуты`}</p>
                <button
                    className={determineButtonClass()}
                    onClick={changeButtonState}
                >
                    {dbSource && !isButtonClicked ? 'Сохранить' : ''}
                </button>
            </div>
            <a target="_blank" href={trailerLink}>
                <img className={'movies__image'} alt={'Фильм'} src={imageLink}/>
            </a>
        </div>
    )
}
