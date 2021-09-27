import React, { useState } from 'react';
import './Auth.css';
import Greeting from "./Greeting";
import FormField from "./FormField";
import Clarify from "./Clarify";

export default function Register({ location, handleRegister }) {
    const [registration, setRegistration] = useState();

    function handleChange(e) {
        const {name, value} = e.target;
        setRegistration({
            ...registration,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(registration);
    }

    return (
        <section className={'auth'}>
            <Greeting />
            <form className='auth__form' onSubmit={handleSubmit}>
                <FormField
                    type='text'
                    visibleName='Имя'
                    name='name'
                    autoComplete='username'
                    handleChange={handleChange}
                />
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
                    autoComplete='new-password'
                    handleChange={handleChange}
                />
                <button className='auth__button' type='submit'>Зарегистрироваться</button>
                <Clarify location={location}/>
            </form>
        </section>
    )
}
