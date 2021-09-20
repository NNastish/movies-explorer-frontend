import React from 'react';
import './NotFound.css';

function NotFound() {
 return (
     <section className={'not-found'}>
      <div className={'not-found__container'}>
       <h1 className={'not-found__title'}>404</h1>
       <p className={'not-found__text'}>Страница не найдена</p>
       <p className={'not-found__button'}>Назад</p>
      </div>
     </section>
 )
}

export default NotFound;
