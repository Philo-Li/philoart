/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useSignIn from '../hooks/useSignIn';
import useField from '../hooks/useField';

const SignInForm = () => {
  const username = useField('username');
  const password = useField('password');
  const history = useHistory();

  const [signIn] = useSignIn();

  const submit = async (event) => {
    event.preventDefault();
    try {
      await signIn({ username: username.value, password: password.value });
      history.push('/');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <Form id="signinform" onSubmit={submit}>
        <Form.Group>
          <div>
            <Form.Label>username:</Form.Label>
            <Form.Control {...username} />
          </div>
          <div>
            <Form.Label>password:</Form.Label>
            <Form.Control {...password} />
          </div>
          <Button variant="primary" id="login-button" type="submit">登录</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignInForm;
