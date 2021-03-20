/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';
import SignUpContainer from './SignUpContainer';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
    };

    try {
      await signUp(variables);
      history.push('/');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <SignUpContainer initialValues={initialValues} onSubmit={onSubmit} />
  );
};

export default SignUp;
