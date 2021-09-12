import React from 'react'
import './Promo.css'
import image from "../../images/header-logo.svg";

export default function Promo() {
    return (
        <div className={'promo'}>
            <h1 className={'promo__title'}>Учебный проект студента&nbsp;факультета Веб-разработки.</h1>
            <img className='promo__image' alt='Логотип' src={image} />
        </div>
    )
}
