import React from 'react'
import './Techs.css';

export default function Techs() {
    return (
        <section className={'techs'}>
            <div className={'techs__container'}>
                <h2 className={'techs__title'}>Технологии</h2>
                <div className={'techs__paragraph'}>
                    <h3 className={'techs__subtitle'}>7 технологий</h3>
                    <p className={'techs__text'}>На курсе веб-разработки мы освоили технологии, которые применили
                        в дипломном проекте.</p>
                    <ul className={'techs__list'}>
                        <li className={'techs__box'}>
                            <a className={'techs_stack'}
                                href={'https://en.wikipedia.org/wiki/HTML'}
                                target={'_blank'}>HTML</a>
                        </li>
                        <li className={'techs__box'}>
                            <a className={'techs_stack'}
                               href={'https://en.wikipedia.org/wiki/CSS'}
                               target={'_blank'}>CSS</a>
                        </li>
                        <li className={'techs__box'}>
                            <a className={'techs_stack'}
                               href={'https://en.wikipedia.org/wiki/JavaScript'}
                               target={'_blank'}>JS</a>
                        </li>
                        <li className={'techs__box'}>
                            <a className={'techs_stack'}
                               href={'https://en.wikipedia.org/wiki/React_Native'}
                               target={'_blank'}>React</a>
                        </li>
                        <li className={'techs__box'}>
                            <a className={'techs_stack'}
                               href={'https://en.wikipedia.org/wiki/Git'}
                               target={'_blank'}>Git</a>
                        </li>
                        <li className={'techs__box'}>
                            <a className={'techs_stack'}
                               href={'https://en.wikipedia.org/wiki/Express.js'}
                               target={'_blank'}>Express.js</a>
                        </li>
                        <li className={'techs__box'}>
                            <a className={'techs_stack'}
                               href={'https://en.wikipedia.org/wiki/MongoDB'}
                               target={'_blank'}>mongoDB</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
