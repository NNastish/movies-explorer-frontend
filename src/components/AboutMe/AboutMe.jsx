import React from 'react';
import './AboutMe.css';
import student from '../../images/student.jpg';

export default function AboutMe() {
    return (
        <section className={'student'}>
            <div className={'student__container'}>
                <h2 className={'student__title'}>Студент</h2>
                    <div className={'student__about'}>
                        <div className={'student__block'}>
                            <h2 className={'student__name'}>Виталий</h2>
                            <p className={'student__prof'}>Фронтенд-разработчик, 30 лет</p>
                            <p className={'student__text'}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                                С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                                начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                            <div className={'student__social'}>
                                <a className={'student__link'}
                                   href={'https://ru-ru.facebook.com/'}
                                   target={'_blank'}>Facebook</a>
                                <a className={'student__link'}
                                   href={'https://github.com/NNastish'}
                                   target={'_blank'}>Github</a>
                            </div>
                        </div>
                        <img className={'student__photo'} alt='Фотография' src={student}/>
                    </div>

            </div>
        </section>
    )
}
