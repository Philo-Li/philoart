import React from 'react';
import { useField } from 'formik';

import TextInput from './TextInput';

const styles = {
  errorText: {
    marginTop: -5,
    marginBottom: 15,
    color: '#d73a4a',
  },
};

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {showError && <p style={styles.errorText}>{meta.error}</p>}
    </>
  );
};

export default FormikTextInput;
