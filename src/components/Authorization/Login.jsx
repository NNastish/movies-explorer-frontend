import React from 'react';
import './Auth.css';
import Greeting from './Greeting';
import Clarify from './Clarify';
import FormField from './FormField';
import { useFormWithValidation } from '../../utils/customHooks';
import Message from '../Message/Message';
import { LOGIN_ERROR } from '../../utils/constants';

export default function Login({
  handleLogin, isFormProceed, setIsFormProceed, isLoginError,
}) {
  const {
    values, handleChange, errors, resetForm, isValid,
  } = useFormWithValidation({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    setIsFormProceed(true);
    handleLogin(values);
    resetForm();
  }

  return (
    <section className="auth">
      <Greeting />
      <form className="auth__form" onSubmit={handleSubmit}>
        <FormField
          type="email"
          visibleName="Email"
          name="email"
          autoComplete="email"
          handleChange={handleChange}
          errors={errors}
          value={values.email}
          inputDisable={isFormProceed}
        />
        <FormField
          type="password"
          visibleName="Пароль"
          name="password"
          autoComplete="current-password"
          handleChange={handleChange}
          errors={errors}
          minLength={8}
          value={values.password}
          inputDisable={isFormProceed}
        />
        {isLoginError ? <Message text={LOGIN_ERROR} isError={true} /> : null}
        <button className="auth__button" type="submit" disabled={!isValid || isFormProceed}>Войти</button>
        <Clarify />
      </form>
    </section>
  );
}
