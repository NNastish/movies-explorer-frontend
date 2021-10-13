/* eslint-disable import/prefer-default-export */
import { useState, useCallback } from 'react';
import { emailCheck } from './constants';

// хук управления формой и валидации формы
export function useFormWithValidation(input) {
  const [values, setValues] = useState(input);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    if (name === 'email') {
      const isEmailCorrect = emailCheck.test(value);
      if (isEmailCorrect) {
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest('form').checkValidity());
      } else {
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: 'Неверный email' });
        setIsValid(false);
      }
    } else {
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values, handleChange, errors, isValid, resetForm,
  };
}
