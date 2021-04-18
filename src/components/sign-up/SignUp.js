import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';
import SignUpContainer from './SignUpContainer';

const initialValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    const variables = {
      firstName: values.username,
      email: values.email,
      username: values.username,
      password: values.password,
    };
    setLoading(true);
    try {
      await signUp(variables);
      history.push('/');
    } catch (e) {
      setErrorInfo(e.message);
      setLoading(false);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <SignUpContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      loading={loading}
    />
  );
};

export default SignUp;
