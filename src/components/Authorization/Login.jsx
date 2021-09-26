import React, { useState } from 'react';
import './Auth.css'
import Greeting from "./Greeting";
import Clarify from "./Clarify";
import FormField from "./FormField";

function Login({ location, handleLogin }) {
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(login);
    }

    return (
        <section className={'auth'}>
            <Greeting />
            <form className="auth__form" onSubmit={handleSubmit}>
                <FormField
                    type='email'
                    visibleName='Email'
                    name='email'
                    handleChange={handleChange}
                />
                <FormField
                    type='password'
                    visibleName='Пароль'
                    name='password'
                    handleChange={handleChange}
                />
                <button className='auth__button' type='submit'>Войти</button>
                <Clarify location={location}/>
            </form>
        </section>
    )
}

export default Login;
