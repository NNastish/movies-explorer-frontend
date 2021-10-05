import React from 'react';
// TODO: state for input error
const FormField = ({ type, name, visibleName, handleChange, autoComplete, errors, minLength = 2, className = 'auth', defaultValue = '' }) => {
    const isNotValid = () => {
        console.log(errors);
        if (errors[name]) {
            return true;
        }
        return false;
    }

    return (
        <>
            <label htmlFor={name} className={`${className}__label`}>{visibleName}
            <input
                className={`${className}__input`}
                onChange={handleChange}
                name={name} type={type}
                minLength={minLength}
                autoComplete={autoComplete}
                defaultValue={defaultValue}
                onClick={(e) => e.target.value = ''}
                required
            />
            </label>
            <span className='auth__input-error' style={{visibility: isNotValid() ? 'visible' : 'hidden'}}>Что-то пошло не так...</span>
        </>
    );
};

export default FormField;
