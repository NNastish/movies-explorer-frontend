import React from 'react';
import './SearchForm.css';
import search from '../../images/search.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
    return (
        <section className={'search'}>
            <div className='search__container'>
                <form className='search__form'>
                    <div className='search__box'>
                        <img src={search} alt='Поиск' className='search__icon' />
                        <input placeholder='Фильм' className='search__input' required />
                        <button type='submit' className='search__button' />
                    </div>
                    <FilterCheckbox filterText={'Короткометражки'}/>
                </form>
            </div>
        </section>

    )
}
