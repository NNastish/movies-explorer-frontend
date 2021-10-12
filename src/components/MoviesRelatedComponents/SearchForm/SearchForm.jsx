import React, { useState } from 'react';
import './SearchForm.css';
import search from '../../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormWithValidation } from '../../../utils/customHooks';

export default function SearchForm({
  submitSearch, handleToggleChange,
}) {
  const { error, setError } = useState('');
  const {
    values, errors, isValid, handleChange,
  } = useFormWithValidation({ query: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setError('');
      submitSearch(values.query);
    } else if (values.query.length > 0) {
      setError(errors.query);
    } else {
      setError('Введите поисковый запрос.');
    }
  };

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__box">
            <img src={search} alt="Поиск" className="search__icon" />
            <input
              placeholder="Фильм"
              className="search__input"
              value={values.key}
              onChange={handleChange}
              minLength="1"
              maxLength="30"
              required
            />
            <button type="submit" className="search__button" />
            <span className="search__query-error">{error}</span>
          </div>
          <FilterCheckbox
            filterText="Короткометражки"
            handleToggleChange={handleToggleChange}
          />
        </form>
      </div>
    </section>

  );
}
