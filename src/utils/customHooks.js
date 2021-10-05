import React, { useEffect, useMemo, useState } from "react";

//хук управления формой и валидации формы
export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
  
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };
  
    const resetForm = React.useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );
  
    return { values, handleChange, errors, isValid, resetForm };
  }

  function defineQuantityParams(windowWidth) {
      if (windowWidth <= 480) {
          return {initialQuantity: 5, addQuantity: 2}
      } else if (windowWidth <= 768) {
          return {initialQuantity: 8, addQuantity: 2}
      } else {
          return {initialQuantity: 12, addQuantity: 3}
      }
  } 

  //хук управления количеством фильмов на экране
  export function useVisibleMoviesQuantity() {
    const windowWidth = useWindowWidth();

    const quantityParams = useMemo(() => defineQuantityParams(windowWidth), [windowWidth])

    return quantityParams;  
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