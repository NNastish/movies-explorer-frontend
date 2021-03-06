import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({filterText}) {
    return (
        <section className={'filter'}>
            <div className={'filter__container'}>
                <label className='filter__label'>
                    <input type='checkbox' className='filter__input' />
                    <span className='filter__span' />
                </label>
            </div>
            <p className={'filter__text'}>{filterText}</p>
        </section>
    )
}
