import React, { useRef } from 'react';
import './SearchForm.css';
import search from '../../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({
  handleSearchPhraseChange, handleFilterChange, isFilterOn, setIsSearched,
}) {
  const inputRef = useRef();

  function handleSearchRequest(e) {
    e.preventDefault();
    handleSearchPhraseChange(inputRef?.current?.value);
    setIsSearched(true);
    inputRef.current.value = '';
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__box">
            <img src={search} alt="Поиск" className="search__icon" />
            <input
              placeholder="Фильм"
              className="search__input"
              ref={inputRef}
              required
            />
            <button type="submit" className="search__button" onClick={handleSearchRequest} />
          </div>
          <FilterCheckbox
            filterText="Короткометражки"
            handleChange={handleFilterChange}
            isFilterOn={isFilterOn}
          />
        </form>
      </div>
    </section>

  );
}
