import React from 'react';
import { useHistory } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <SignInContainer initialValues={initialValues} onSubmit={onSubmit} />
  );
};

export default SignIn;
