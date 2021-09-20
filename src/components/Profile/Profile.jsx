import React from 'react';
import './Profile.css';
import logo from "../../images/logo.svg";
import account from "../../images/account.svg";

export default function Profile() {
    return (
        <section className={'profile'}>
            <form className='profile__form'>
                <h1 className={'profile__title'}>Привет, Виталий!</h1>

                <input className='profile__input' name='name' type='text' placeholder='Имя'
                       minLength='2' value={'Имя'} required/>
                <input className='profile__input' name='email' type='email' placeholder='FormField'
                       minLength='4' value={'Email'} required/>

                <div className={'profile__box'}>
                    <p className='profile__text'>Редактировать</p>
                    <p className='profile__link'>Выйти из аккаунта</p>
                </div>
            </form>
        </section>
    )
}
