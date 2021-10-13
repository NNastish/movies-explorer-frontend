import React from 'react';
import './Auth.css';
import Greeting from './Greeting';
import FormField from './FormField';
import Clarify from './Clarify';
import { useFormWithValidation } from '../../utils/customHooks';
import Message from '../Message/Message';
import { REGISTER_ERROR } from '../../utils/constants';

export default function Register({
  handleRegister, isFormProceed, setIsFormProceed, isRegisterError,
}) {
  const {
    values, handleChange, errors, resetForm, isValid,
  } = useFormWithValidation({
    email: '',
    password: '',
    name: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    setIsFormProceed(true);
    handleRegister(values);
    resetForm();
  }

  return (
    <section className="auth">
      <Greeting />
      <form className="auth__form" onSubmit={handleSubmit}>
        <FormField
          type="text"
          visibleName="Имя"
          name="name"
          autoComplete="username"
          handleChange={handleChange}
          errors={errors}
          inputDisable={isFormProceed}
        />
        <FormField
          type="email"
          visibleName="Email"
          name="email"
          handleChange={handleChange}
          errors={errors}
          inputDisable={isFormProceed}
        />
        <FormField
          type="password"
          visibleName="Пароль"
          name="password"
          autoComplete="new-password"
          handleChange={handleChange}
          errors={errors}
          minLength={8}
          inputDisable={isFormProceed}
        />
        {isRegisterError ? <Message text={REGISTER_ERROR} isError={true} /> : null}
        <button className="auth__button" type="submit" disabled={!isValid || isFormProceed}>Зарегистрироваться</button>
        <Clarify />
      </form>
    </section>
  );
}
