import React from 'react';
import './Auth.css';
import Greeting from "./Greeting";
import FormField from "./FormField";
import Clarify from "./Clarify";

export default function Register() {
    return (
        <section className={'auth'}>
            <Greeting />
            <form className='auth__form'>
                <FormField
                    type='text'
                    visibleName='Имя'
                    name='name'
                />
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
                <button className='auth__button' type='submit'>Зарегистрироваться</button>
                <Clarify />
            </form>
        </section>
    )
}
