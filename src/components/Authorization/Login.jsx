import React from 'react';
import './Auth.css'
import Greeting from "./Greeting";
import Clarify from "./Clarify";
import FormField from "./FormField";

function Login() {
    return (
        <section className={'auth'}>
            <Greeting />
            <form className="auth__form">
                <FormField
                    type='email'
                    visibleName='Email'
                    name='email'
                />
                <FormField
                    type='password'
                    visibleName='Пароль'
                    name='password'
                />
                <button className='auth__button' type='submit'>Войти</button>
                <Clarify />
            </form>
        </section>
    )
}

export default Login;
