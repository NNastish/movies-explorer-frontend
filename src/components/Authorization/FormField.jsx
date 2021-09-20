import React from 'react';

const FormField = ({ type, name, visibleName }) => {
    return (
        <>
            <label htmlFor={name} className='auth__label'>{visibleName}</label>
            <input className='auth__input' name={name} type={type} minLength='2' required/>
            <span className="auth__input-error">Что-то пошло не так...</span>
        </>
    );
};

export default FormField;
