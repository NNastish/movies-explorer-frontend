import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const history = useHistory();

  const handleClick = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push('./');
    }
  };

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <button className="not-found__button" onClick={handleClick} type="button">Назад</button>
      </div>
    </section>
  );
}
