import React, { useRef } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ filterText, handleToggleChange }) {
  const checker = useRef();

  function changeFilterStatus() {
    handleToggleChange(checker.current.checked);
  }

  return (
    <section className="filter">
      <div className="filter__container">
        <label className="filter__label">
          <input
            type="checkbox"
            className="filter__input"
            ref={checker}
            onChange={changeFilterStatus}
          />
          <span className="filter__span" />
        </label>
      </div>
      <p className="filter__text">{filterText}</p>
    </section>
  );
}
