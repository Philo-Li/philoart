import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import ChangePasswordForm from './ChangePasswordForm';

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, 'Must be 6 characters or more'),
  newPassword: Yup.string()
    .min(6, 'Must be 6 characters or more'),
});

const ChangePasswordContainer = ({
  initialValues, onSubmit, errorInfo, successInfo,
}) => (
  <div className="container-col-settings">
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
      {({ handleSubmit }) => <ChangePasswordForm onSubmit={handleSubmit} />}
    </Formik>
  </div>
);

export default ChangePasswordContainer;
