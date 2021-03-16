import React from 'react';

import useSignUp from '../hooks/useSignUp';
import SignUpContainer from './SignUpContainer';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};

const SignUp = () => {
  // eslint-disable-next-line no-unused-vars
  const [signUp] = useSignUp();
  // const onSubmit = async (values) => {
  //   const { username, password } = values;

  //   try {
  //     await signUp({ username, password });
  //   } catch (e) {
  //     // eslint-disable-next-line no-console
  //     console.log(e);
  //   }
  // };
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <SignUpContainer initialValues={initialValues} onSubmit={onSubmit} />
  );
};

export default SignUp;
