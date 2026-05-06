import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      const newErr = { ...prev };
      if (value != "") {
        delete newErr[name];
      }
      return newErr;
    });
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
  };
};
