import React from 'react';

const FormField = ({
  type, name, visibleName, handleChange, autoComplete, errors, minLength = 2, className = 'auth', defaultValue = '',
  inputDisable = false,
  // value,
}) => {
  const isNotValid = () => {
    if (errors[name]) {
      return true;
    }
    return false;
  };

  return (
    <>
      <label htmlFor={name} className={`${className}__label`}>
        {visibleName}
        <input
          className={`${className}__input`}
          onChange={handleChange}
          name={name}
          type={type}
          minLength={minLength}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          disabled={inputDisable}
          // value={value}
          required
        />
      </label>
      <span className="auth__input-error" style={{ visibility: isNotValid() ? 'visible' : 'hidden' }}>{errors[name]}</span>
    </>
  );
};

export default FormField;
