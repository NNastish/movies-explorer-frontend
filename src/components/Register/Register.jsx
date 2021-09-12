import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import {Link} from "react-router-dom";

export default function Register() {
    return (
        <section className={'register'}>
            <div className={'register__container'}>
                <Link to='/'><img className='register__logo' alt='Логотип' src={logo} /></Link>
                <h1 className={'register__title'}> Рады видеть!</h1>
            </div>
            <form className='register__form'>
                <label htmlFor='password' className='register__label'>Имя</label>
                <input className='register__input' name='name' type='text' minLength='2' required/>
                <span className='register__input-error'>Что-то пошло не так...</span>

                <label htmlFor='password' className='register__label'>Email</label>
                <input className='register__input' name='email' type='email' minLength='2' required/>
                <span className="register__input-error">Что-то пошло не так...</span>

                <label htmlFor='password' className='register__label'>Пароль</label>
                <input className='register__input register__input_password' name='password' type='password' minLength='4' required/>
                <span className="register__input-error">Что-то пошло не так...</span>

                <button className='register__button' type='submit'>Зарегистрироваться</button>
                <div className={'register__box'}>
                    <p className='register__text'>Уже зарегистрированы?</p>
                    <Link to='/signin'><p className='register__link'>Войти</p></Link>
                </div>
            </form>
        </section>
    )
}
