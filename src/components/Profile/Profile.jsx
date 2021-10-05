import React, { useState } from 'react';
import './Profile.css';
import logo from "../../images/logo.svg";
import account from "../../images/account.svg";
import FormField from '../Authorization/FormField';

export default function Profile({ currentUser, handleUpdateUser, handleExit, validation }) {
    const updateUser = (e) => {
        e.preventDefault();
        handleUpdateUser(validation.values);
        validation.resetForm();
    }

    const handleChange = (e) => {
        validation.handleChange(e);
    }

    return (
        <section className={'profile'}>
            <form className='profile__form' onSubmit={updateUser}>
                <h1 className={'profile__title'}>{`Привет, ${currentUser.name}`}</h1>

                <FormField 
                    type='text'
                    name='name'
                    className='profile'
                    handleChange={handleChange}
                    visibleName='Имя'
                    defaultValue={currentUser.name}
                    errors={validation.errors}
                />
                <FormField 
                    type='email'
                    name='email'
                    className='profile'
                    handleChange={handleChange}
                    visibleName='Email'
                    defaultValue={currentUser.email}
                    errors={validation.errors}
                />

                <div className={'profile__box'}>
                    <button className='profile__text' type='submit' disabled={!validation.isValid}>Редактировать</button>
                    <button className='profile__link' onClick={handleExit}>Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}
