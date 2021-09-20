import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
    return (
        <section className={'project'}>
            <div className={'project__container'}>
                <h2 className={'project__title'}>О проекте</h2>
                <ul className={'project__list'}>
                    <li className={'project__block'}>
                        <h3 className={'project__subtitle'}>Дипломный проект включал 5 этапов</h3>
                        <p className={'project__text'}>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className={'project__block'}>
                        <h3 className={'project__subtitle'}>На выполнение диплома ушло 5 недель</h3>
                        <p className={'project__text'}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>
                <div className={'project__tracker'}>
                    <div className={'project__box'}>
                        <div className={'project__line project__line_backend'}>
                            <p className={'project__time project__time_backend'}>1 неделя</p>
                            <p className={'project__name'}>Back-end</p>
                        </div>
                        <div className={'project__line project__line_frontend'}>
                            <p className={'project__time project__time_frontend'}>4 недели</p>
                            <p className={'project__name'}>Front-end</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
