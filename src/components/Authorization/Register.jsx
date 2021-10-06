import React from 'react';
import './Auth.css';
import Greeting from './Greeting';
import FormField from './FormField';
import Clarify from './Clarify';

export default function Register({ handleRegister, validation }) {
  function handleChange(e) {
    validation.handleChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(validation.values);
    validation.resetForm();
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
          errors={validation.errors}
        />
        <FormField
          type="email"
          visibleName="Email"
          name="email"
          handleChange={handleChange}
          errors={validation.errors}
        />
        <FormField
          type="password"
          visibleName="Пароль"
          name="password"
          autoComplete="new-password"
          handleChange={handleChange}
          errors={validation.errors}
          minLength={8}
        />
        <button className="auth__button" type="submit" disabled={!validation.isValid}>Зарегистрироваться</button>
        <Clarify />
      </form>
    </section>
  );
}
