import React, { useState, useContext } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import NavTab from '../Header/NavTab/NavTab';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import { findEndPoint } from '../../utils/utils';

export default function Navigation() {
  const [navTabOpened, setNavTabOpened] = useState(false);
  const currentLocation = useContext(CurrentLocationContext);
  const isHomeEndPoint = findEndPoint(currentLocation) === '/';
  const blockBackgroundColor = isHomeEndPoint ? '#F3C1F8' : '#FFFFFF';

  function onClick() {
    setNavTabOpened(!navTabOpened);
  }

  function closePopup() {
    setNavTabOpened(false);
  }

  return (
    <section
      className="navigation"
      style={{ backgroundColor: blockBackgroundColor }}
    >
      <div className="navigation__container">
        <Link className="link" to="/"><img className="navigation__logo" alt="Логотип" src={logo} /></Link>

        <ul className="navigation__nav">
          <li className="navigation__list">
            <Link className="link" to="/movies"><p className="navigation__film">Фильмы</p></Link>
          </li>
          <li className="navigation__list">
            <Link className="link" to="/saved-movies"><p className="navigation__film">Сохранённые фильмы</p></Link>
          </li>
        </ul>

        <ul className="navigation__nav navigation__nav_item">
          <li className="navigation__list">
            <Link className="link" to="/profile">
              <p className="navigation__account">Аккаунт</p>
            </Link>
          </li>
          <li className="navigation__list navigation__list_account-icon">
            <Link className="link" to="/profile" style={{ backgroundColor: blockBackgroundColor }}>
              <img className="navigation__account-icon" alt="Аккаунт" src={account} style={{ backgroundColor: blockBackgroundColor }} />
            </Link>
          </li>
        </ul>

        <div className="menu" onClick={onClick}>
          <div className="menu__burger" />
          <div className="menu__burger" />
          <div className="menu__burger" />
        </div>

        <NavTab visible={navTabOpened} closePopup={closePopup} />

      </div>
    </section>
  );
}
