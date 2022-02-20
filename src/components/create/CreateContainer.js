import React from 'react';
import { Formik } from 'formik';
import { Image, Alert } from 'react-bootstrap';
import * as yup from 'yup';

import CreateForm from './CreateForm';

import logo from '../../img/logo/logo2.svg';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required(),
  description: yup
    .string(),
  license: yup
    .string(),
  type: yup
    .string(),
});

const CreateContainer = ({
  initialValues, onSubmit, errorInfo, loading,
}) => (
  <div className="container-col-login">
    <div className="container-profile">
      <div className="profile-item">
        <h1>Create</h1>
      </div>
      <div className="profile-item">
        <Image src={logo} width={150} height={150} magin={10} roundedCircle />
      </div>
    </div>
    {errorInfo && (
    <Alert variant="danger">
      {errorInfo}
    </Alert>
    )}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <CreateForm onSubmit={handleSubmit} loading={loading} />}
    </Formik>
  </div>
);

export default CreateContainer;
