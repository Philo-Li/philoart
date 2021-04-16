import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSignIn from '../../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    const { username, password } = values;
    setLoading(true);
    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      setErrorInfo(e.message);
    }
    setLoading(false);
  };

  return (
    <SignInContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      loading={loading}
    />
  );
};

export default SignIn;
