import React from 'react';
import { Formik } from 'formik';
import { Image, Card, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import SignInForm from './SignInForm';

import logo from '../../img/logo/logo2.svg';

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('Username is required'),
  password: Yup
    .string()
    .required('Password is required'),
});

const SignInContainer = ({ initialValues, onSubmit, errorInfo }) => (
  <div className="container-col-login">
    <div className="container-profile">
      <div className="profile-item">
        <h1>Login</h1>
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
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
    <div className="col-item-2 flex-center">
      Don
      { '\'' }
      t have an account?
      <Card.Link href="/signup"> Join</Card.Link>
    </div>
  </div>
);

export default SignInContainer;
