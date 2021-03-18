import React from 'react';
import { Image, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SignUpForm from './SignUpForm';
import logo from '../logo.png';

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
    .min(6, 'Must be 6 characters or more')
    .required('Required'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUpContainer = ({ initialValues, onSubmit }) => (
  <div className="container-col-login">
    <div className="container-profile">
      <div className="profile-item">
        <h1>Sign up</h1>
      </div>
      <div className="profile-item">
        <Image src={logo} width={150} height={150} magin={10} roundedCircle />
      </div>
    </div>
    <div className="col-item-2 flex-center">
      Already have an account?
      {' '}
      <Card.Link href="/signin">Login</Card.Link>
    </div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  </div>
);

export default SignUpContainer;
