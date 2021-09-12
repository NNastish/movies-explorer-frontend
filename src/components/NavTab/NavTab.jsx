import React from 'react'
import './NavTab.css'
import close from "../../images/close.svg";
import {Link} from "react-router-dom";
import account from "../../images/account.svg";

export default function NavTab() {
    return (
        <div className={'popup popup_active'}>
            <div className={'popup__window'}>
                <img className={'popup__close'} alt={'Закрыть'} src={close}/>


                <ul className={'popup__menu'}>
                    <li className={'popup__text'}>
                        <p>Главная</p>
                    </li>
                    <li className={'popup__text'}>
                        <Link to='/movies'><p>Фильмы</p></Link>
                    </li>
                    <li className={'popup__text'}>
                        <Link to='/saved-movies'><p>Сохранённые фильмы</p></Link>
                    </li>
                </ul>

                <ul className={'navigation__nav navigation__nav_item navigation__nav_popup'}>
                    <li className={'navigation__list'}>
                        <Link to='/profile'><p className={'navigation__account'}>Аккаунт</p></Link>
                    </li>
                    <li className={'navigation__list navigation__list_account-icon'}>
                        <Link to='/profile'><img className={'navigation__account-icon'} alt={'Аккаунт'} src={account}/></Link>
                    </li>
                </ul>

            </div>

        </div>
    )

}
