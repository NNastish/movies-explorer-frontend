import React from 'react';
import './AuthenticationHeader.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';

function AuthenticationHeader() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          {' '}
          <img className="header__logo" alt="Логотип" src={logo} />
        </Link>
        <div className="header__nav">
          <Link to="/signup">
            <button className="header__button" type="button">
              Регистрация
            </button>
          </Link>
          <Link to="/signin">
            <button className="header__button header__button_active" type="button">
              Войти
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default AuthenticationHeader;
