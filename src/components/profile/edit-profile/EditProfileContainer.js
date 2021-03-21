import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import EditProfileForm from './EditProfileForm';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  username: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .matches('^[a-zA-Z0-9_]*$', 'Invalid username')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more'),
});

const EditProfileContainer = ({
  initialValues, onSubmit, errorInfo, successInfo,
}) => (
  <div className="container-col-login">
    {errorInfo && (
      <Alert variant="danger">
        {errorInfo}
      </Alert>
    )}
    {successInfo && (
      <Alert variant="success">
        {successInfo}
      </Alert>
    )}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <EditProfileForm onSubmit={handleSubmit} />}
    </Formik>
  </div>
);

export default EditProfileContainer;
