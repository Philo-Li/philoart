/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';

const TextInput = ({ label, info, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="container-col-0">
      <div className="">
        <label htmlFor={label}>
          {label}
          {info}
        </label>
      </div>

      {meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}

      <div className="">
        <input className="text-input" {...field} {...props} />
      </div>

    </div>
  );
};

export default TextInput;
