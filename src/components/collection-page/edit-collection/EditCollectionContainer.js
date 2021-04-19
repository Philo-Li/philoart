import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import EditCollectionForm from './EditCollectionForm';

const validationSchema = Yup.object().shape({
  title: Yup
    .string()
    .required('Title is required'),
  description: Yup
    .string()
    .max(50, 'Must be 50 characters or less'),
});

const EditCollectionContainer = ({
  initialValues, onSubmit, errorInfo, successInfo, loading,
}) => (
  <div className="p-3">
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
      {({ handleSubmit }) => <EditCollectionForm onSubmit={handleSubmit} loading={loading} />}
    </Formik>
  </div>
);

export default EditCollectionContainer;
