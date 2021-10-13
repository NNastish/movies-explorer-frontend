import React from 'react';
import TechElement from './TechElement';
import './Techs.css';

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__paragraph">
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__text">
            На курсе веб-разработки мы освоили технологии, которые применили
            в дипломном проекте.

          </p>
          <ul className="techs__list">
            <TechElement link="https://en.wikipedia.org/wiki/HTML" text="HTML" />
            <TechElement link="https://en.wikipedia.org/wiki/CSS" text="CSS" />
            <TechElement link="https://en.wikipedia.org/wiki/JavaScript" text="JS" />
            <TechElement link="https://ru.wikipedia.org/wiki/React" text="React" />
            <TechElement link="https://en.wikipedia.org/wiki/Git" text="Git" />
            <TechElement link="https://en.wikipedia.org/wiki/Express.js" text="Express.js" />
            <TechElement link="https://en.wikipedia.org/wiki/MongoDB" text="mongoDB" />
          </ul>
        </div>
      </div>
    </section>
  );
}
