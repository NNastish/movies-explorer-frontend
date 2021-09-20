import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './Footer.css';
import { FOOTER_HEADER_ENDPOINTS } from "../../utils/constants";
import FooterElement from "./FooterElement";

export default function Footer({ showFooter }) {
    return (
            <section className={'footer'} style={{visibility: showFooter ? "visible" : "hidden"}}>
                <div className={'footer__container'}>
                    <h2 className={'footer__title'}>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                    <div className={'footer__nav'}>
                        <p className={'footer__text'}>&#169; 2021</p>
                        <ul className={'footer__list'}>
                            <FooterElement
                                link='https://practicum.yandex.ru/'
                                name='Яндекс.Практикум'
                            />
                            <FooterElement
                                link='https://github.com/NNastish'
                                name='Github'
                            />
                            <FooterElement
                                link='https://ru-ru.facebook.com/'
                                name='Facebook'
                            />
                        </ul>
                    </div>
                </div>
            </section>
    )
}
