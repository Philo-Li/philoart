import React from 'react';
import { Image, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SignUpForm from './SignUpForm';
import logo from '../../img/logo/logo2.svg';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  username: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .matches('^[a-zA-Z0-9_]*$', 'Invalid username')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .required('Required'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUpContainer = ({
  initialValues, onSubmit, errorInfo, loading,
}) => (
  <div className="container-col-login">
    <div className="container-profile">
      <div className="profile-item">
        <h1>Sign up</h1>
      </div>
      <div className="profile-item">
        <Image src={logo} width={150} height={150} magin={10} roundedCircle />
      </div>
    </div>
    <div className="login-info flex-center">
      Already have an account?
      <a href="/signin">Login</a>
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} loading={loading} />}
    </Formik>
  </div>
);

export default SignUpContainer;
