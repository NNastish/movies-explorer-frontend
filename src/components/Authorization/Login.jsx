import React, { useState } from 'react';
import './Auth.css'
import Greeting from "./Greeting";
import Clarify from "./Clarify";
import FormField from "./FormField";

function Login({ location, handleLogin, validation }) {
    function handleChange(e) {
        validation.handleChange(e);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(validation.values);
        validation.resetForm();
    }

    return (
        <section className={'auth'}>
            <Greeting />
            <form className="auth__form" onSubmit={handleSubmit}>
                <FormField
                    type='email'
                    visibleName='Email'
                    name='email'
                    autoComplete='email'
                    handleChange={handleChange}
                    errors={validation.errors}
                />
                <FormField
                    type='password'
                    visibleName='Пароль'
                    name='password'
                    autoComplete='current-password'
                    handleChange={handleChange}
                    errors={validation.errors}
                    minLength={8}
                />
                <button className='auth__button' type='submit' disabled={!validation.isValid}>Войти</button>
                <Clarify location={location}/>
            </form>
        </section>
    )
}

export default Login;
