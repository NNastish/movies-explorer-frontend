import React from 'react';
import './Navigation.css';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import close from '../../images/close.svg';
import {Link} from "react-router-dom";
import NavTab from "../NavTab/NavTab";

export default function Navigation() {
    return (
        <section className={'navigation'}>
            <div className={'navigation__container'}>
                <Link className={'link'} to='/'><img className='navigation__logo' alt='Логотип' src={logo} /></Link>

                <ul className={'navigation__nav'}>
                    <li className={'navigation__list'}>
                        <Link className={'link'} to='/movies'><p className={'navigation__film'}>Фильмы</p></Link>
                    </li>
                    <li className={'navigation__list'}>
                        <Link className={'link'} to='/saved-movies'><p className={'navigation__film'}>Сохранённые фильмы</p></Link>
                    </li>
                </ul>

                <ul className={'navigation__nav navigation__nav_item'}>
                    <li className={'navigation__list'}>
                        <Link className={'link'} to='/profile'><p className={'navigation__account'}>Аккаунт</p></Link>
                    </li>
                    <li className={'navigation__list navigation__list_account-icon'}>
                        <Link className={'link'} to='/profile'><img className={'navigation__account-icon'} alt={'Аккаунт'} src={account}/></Link>
                    </li>
                </ul>

                <div className={'menu'}>
                    <div className={'menu__burger'}></div>
                    <div className={'menu__burger'}></div>
                    <div className={'menu__burger'}></div>

                </div>
            {/* Бургер-меню появляется как на макете на расширении 768px,
            сейчас скрыто с помощью visibility: hidden в компоненте NavTab */}
            <NavTab />

            </div>
        </section>
    )
}
