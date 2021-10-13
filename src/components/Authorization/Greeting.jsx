import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Greeting = () => (
  <div className="auth__container">
    <Link to="/"><img className="auth__logo" alt="Логотип" src={logo} /></Link>
    <h1 className="auth__title"> Рады видеть!</h1>
  </div>
);

export default Greeting;
