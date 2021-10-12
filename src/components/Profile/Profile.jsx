import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import FormField from '../Authorization/FormField';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/customHooks';
import Message from '../Message/Message';
import { PROFILE_UPDATE_ERROR, PROFILE_UPDATE_SUCCESS } from '../../utils/constants';

export default function Profile({
  handleUpdateUser,
  handleExit,
  isUpdateError,
  setIsUpdateError,
  isUpdateSuccess,
  setIsUpdateSuccess,
}) {
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const {
    values, handleChange, errors, resetForm, isValid,
  } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email,
  });

  const updateUser = (e) => {
    e.preventDefault();
    setIsUpdateError(false);
    setIsUpdateSuccess(false);
    handleUpdateUser(values);
    resetForm();
  };

  useEffect(() => {
    setHasBeenUpdated((values.name !== currentUser.name) || (values.email !== currentUser.email));
  }, [values.name, values.email]);

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={updateUser}>
        <h1 className="profile__title">{`Привет, ${currentUser.name}`}</h1>

        <FormField
          type="text"
          name="name"
          className="profile"
          handleChange={handleChange}
          visibleName="Имя"
          defaultValue={currentUser.name}
          errors={errors}
        />
        <FormField
          type="email"
          name="email"
          className="profile"
          handleChange={handleChange}
          visibleName="Email"
          defaultValue={currentUser.email}
          errors={errors}
        />
        {isUpdateError ? <Message text={PROFILE_UPDATE_ERROR} isError={true} /> : null}
        {isUpdateSuccess ? <Message text={PROFILE_UPDATE_SUCCESS} /> : null}

        <div className="profile__box">
          <button className="profile__text" type="submit" disabled={!isValid || !hasBeenUpdated}>Редактировать</button>
          <button className="profile__link" onClick={handleExit} type="button">Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  );
}
