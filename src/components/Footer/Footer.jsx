import React, { useContext } from 'react';
import './Footer.css';
import FooterElement from './FooterElement';
import { findEndPoint } from '../../utils/utils';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';

export default function Footer({ showFooter }) {
  const currentLocation = useContext(CurrentLocationContext);

  function isVisible() {
    if (findEndPoint(currentLocation) === '/profile') {
      return false;
    }
    return showFooter;
  }

  return (
    <section className="footer" style={{ visibility: isVisible() ? 'visible' : 'hidden' }}>
      <div className="footer__container">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__nav">
          <p className="footer__text">&#169; 2021</p>
          <ul className="footer__list">
            <FooterElement
              link="https://practicum.yandex.ru/"
              name="Яндекс.Практикум"
            />
            <FooterElement
              link="https://github.com/NNastish"
              name="Github"
            />
            <FooterElement
              link="https://ru-ru.facebook.com/"
              name="Facebook"
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
