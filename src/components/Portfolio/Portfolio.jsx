import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

export default function Portfolio() {
    return (
        <section className={'portfolio'}>
            <div className={'portfolio__container'}>
                <h2 className={'portfolio__title'}>Портфолио</h2>
                <ul className={'portfolio__list'}>
                    <li className={'portfolio__link'}>
                        <a className={'portfolio__subtitle'}
                           href={'https://nnastish.github.io/how-to-learn/'}
                           target={'_blank'}>Статичный сайт</a>
                        <img className={'portfolio__icon'} alt='Стрелка' src={arrow} />
                        </li>
                    <li className={'portfolio__link'}>
                        <a className={'portfolio__subtitle'}
                           href={'https://nnastish.github.io/russian-travel/index.html'}
                           target={'_blank'}>Адаптивный сайт</a>
                        <img className={'portfolio__icon'} alt='Стрелка' src={arrow} />
                        </li>
                    <li className={'portfolio__link'}>
                        <a className={'portfolio__subtitle'}
                           href={'https://github.com/NNastish/react-mesto-api-full'}
                           target={'_blank'}>Одностраничное приложение</a>
                        <img className={'portfolio__icon'} alt='Стрелка' src={arrow} />
                        </li>
                </ul>
            </div>
        </section>
    )
}
