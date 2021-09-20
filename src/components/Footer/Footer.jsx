import React from 'react'
import './Footer.css';

export default function Footer() {
    return (
        <section className={'footer'}>
            <div className={'footer__container'}>
                <h2 className={'footer__title'}>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <div className={'footer__nav'}>
                    <p className={'footer__text'}>&#169; 2021</p>
                    <ul className={'footer__list'}>
                        <li>
                            <a className={'footer__link'}
                               href={'https://practicum.yandex.ru/'}
                               target={'_blank'}>Яндекс.Практикум</a>
                        </li>
                        <li>
                            <a className={'footer__link'}
                               href={'https://github.com/NNastish'}
                               target={'_blank'}>Github</a>
                        </li>
                        <li>
                            <a className={'footer__link'}
                               href={'https://ru-ru.facebook.com/'}
                               target={'_blank'}>Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
