import React, { useState, useRef } from 'react';
import './SearchForm.css';
import search from '../../images/search.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ query, handleSearchQueryChange}) {
    const inputRef = useRef();

    function handleSubmit(e) {
        console.log('hello')
        e.preventDefault();
        handleSearchQueryChange({
            ...query,
            request: inputRef.current.value
        })
        inputRef.current.value = '';
    }

    return (
        <section className={'search'}>
            <div className='search__container'>
                <form className='search__form'>
                    <div className='search__box'>
                        <img src={search} alt='Поиск' className='search__icon' />
                        <input
                            placeholder='Фильм'
                            className='search__input'
                            ref={inputRef}
                            required
                        />
                        <button type='submit' className='search__button' onClick={handleSubmit}/>
                    </div>
                    <FilterCheckbox filterText={'Короткометражки'} query={query} handleChange={handleSearchQueryChange}/>
                </form>
            </div>
        </section>

    )
}
