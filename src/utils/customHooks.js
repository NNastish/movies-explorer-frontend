import React, { useEffect, useMemo, useState } from 'react';
import { defineMovieQuantityParams } from './utils';

// хук управления формой и валидации формы
export function useFormWithValidation(input) {
  const [values, setValues] = React.useState(input);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { target } = event.target;
    const { name } = target.name;
    const { value } = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = React.useCallback(
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

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

// хук управления количеством фильмов на экране
export function useVisibleMoviesQuantity() {
  const windowWidth = useWindowWidth();

  const { initialQuantity, addQuantity } = useMemo(
    () => defineMovieQuantityParams({ windowWidth }), [windowWidth],
  );

  return { initialQuantity, addQuantity };
}
