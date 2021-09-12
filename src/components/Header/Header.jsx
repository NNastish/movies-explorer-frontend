import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className={'header'}>
            <div className={'header__container'}>
                <Link to='/'> <img className='header__logo' alt='Логотип' src={logo} /></Link>
                <div className={'header__nav'}>
                    <button className={'header__button'}>Регистрация</button>
                    <button className={'header__button header__button_active'}>Войти</button>
                </div>
            </div>
        </header>
    )
}
export default Header;
