import React, { useState } from 'react';
import './Profile.css';
import logo from "../../images/logo.svg";
import account from "../../images/account.svg";

export default function Profile({ currentUser, handleUpdateUser, handleExit }) {
    const [userData, setUserData] = useState({});

    const updateUser = (e) => {
        e.preventDefault();
        handleUpdateUser(userData);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    return (
        <section className={'profile'}>
            <form className='profile__form' onSubmit={updateUser}>
                <h1 className={'profile__title'}>{`Привет, ${currentUser.name}`}</h1>

                <label className='profile__label'>Имя
                <input className='profile__input' name='name' type='text' 
                       minLength='2'
                       onChange={handleChange}
                       defaultValue={currentUser.name}
                       required
                />
                </label>

                <label className='profile__label'>Email
                <input className='profile__input' name='email' type='email'
                       minLength='4'
                       onChange={handleChange}
                       onClick={(e) => e.target.value = ''}
                       defaultValue={currentUser.email}
                       required
                />

                </label>

                <div className={'profile__box'}>
                    <button className='profile__text' type='submit'>Редактировать</button>
                    <button className='profile__link' onClick={handleExit}>Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}
