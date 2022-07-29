import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSignIn from '../../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await signIn({ email, password });
      history.push('/');
    } catch (e) {
      setErrorInfo(e.message);
      setLoading(false);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
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
