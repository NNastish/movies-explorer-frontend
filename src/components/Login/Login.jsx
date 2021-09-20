import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import {Link} from "react-router-dom";

function Login() {
    return (
        <section className={'login'}>
            <div className={'login__container'}>
                <Link to='/'><img className='login__logo' alt='Логотип' src={logo} /></Link>
                <h1 className={'login__title'}> Рады видеть!</h1>
            </div>
            <form className="login__form">
                <label htmlFor='password' className='login__label'>Email</label>
                <input className='login__input' name='email' type='email'
                       minLength='2' required/>
                <span className='login__input-error'>Что-то пошло не так...</span>

                <label htmlFor='password' className='login__label'>Пароль</label>
                <input className='login__input login__input_password' name='password' type='password'
                       minLength='4' required/>
                <span className='login__input-error'>Что-то пошло не так...</span>

                <button className='login__button' type='submit'>Войти</button>
                <div className={'login__box'}>
                    <p className="login__text">Ещё не зарегистрированы?</p>
                    <Link to='/signup'><p className="login__link">Регистрация</p></Link>
                </div>
            </form>


        </section>
    )
}

export default Login;
