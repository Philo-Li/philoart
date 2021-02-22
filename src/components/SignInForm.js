/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Image, Card } from 'react-bootstrap';
import useSignIn from '../hooks/useSignIn';
import useField from '../hooks/useField';
import '../index.css';
import logo from '../logo.png';

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
    <div className="container-col-login">
      <div className="container-profile">
        <div className="profile-item">
          <h1>Login</h1>
        </div>
        <div className="profile-item">
          <Image src={logo} width={150} height={150} magin={10} roundedCircle />
        </div>
      </div>
      <Form id="signinform" onSubmit={submit}>
        <Form.Group>
          <div className="col-item-1">
            <Form.Label>username:</Form.Label>
            <Form.Control {...username} />
          </div>
          <div className="col-item-1">
            <Form.Label>password:</Form.Label>
            <Form.Control {...password} />
          </div>
          <div className="col-item-1">
            <Button variant="primary" id="login-button" type="submit" block>Login</Button>
          </div>
        </Form.Group>
      </Form>
      <div>
        Don
        { '\'' }
        t have an account?
        <Card.Link href="/signup"> Join</Card.Link>
      </div>
    </div>
  );
};

export default SignInForm;
