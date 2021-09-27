import React from 'react';
// TODO: state for input error
const FormField = ({ type, name, visibleName, handleChange, autoComplete }) => {
    return (
        <>
            <label htmlFor={name} className='auth__label'>{visibleName}</label>
            <input
                className='auth__input'
                onChange={handleChange}
                name={name} type={type}
                minLength='2'
                autoComplete={autoComplete}
                required/>
            <span className="auth__input-error">Что-то пошло не так...</span>
        </>
    );
};

export default FormField;
