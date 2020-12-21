/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useSignUp from '../hooks/useSignUp';
import useField from '../hooks/useField';

const SignUpForm = () => {
  const username = useField('username');
  const password = useField('password');
  const passwordConfirm = useField('password');
  const history = useHistory();

  const [signUp] = useSignUp();

  const submit = async (event) => {
    event.preventDefault();
    try {
      signUp({ username: username.value, password: password.value });
      // eslint-disable-next-line no-alert
      if (window.confirm('账号注册成功，现在登录？')) {
        history.push('/signin');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div>
      <h2>注册</h2>
      <Form id="signupform" onSubmit={submit}>
        <Form.Group>
          <div>
            <Form.Label>用户名或邮箱:</Form.Label>
            <Form.Control {...username} />
          </div>
          <div>
            <Form.Label>密码:</Form.Label>
            <Form.Control {...password} />
          </div>
          <div>
            <Form.Label>密码确认:</Form.Label>
            <Form.Control {...passwordConfirm} />
          </div>
          <Button variant="primary" id="login-button" type="submit">注册</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignUpForm;
