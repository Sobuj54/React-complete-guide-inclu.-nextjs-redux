import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredVaule] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(e) {
    setEnteredVaule(e.target.value);
    setDidEdit(false);
  }

  function handleInputBlur(e) {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
