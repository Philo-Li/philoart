/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Image, Card } from 'react-bootstrap';
import useSignUp from '../hooks/useSignUp';
import useField from '../hooks/useField';
import '../index.css';
import logo from '../logo.png';

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
      if (window.confirm('login now?')) {
        history.push('/signin');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div className="container-col-login">
      <div className="container-profile">
        <div className="profile-item">
          <h1>Sign up</h1>
        </div>
        <div className="profile-item">
          <Image src={logo} width={150} height={150} magin={10} roundedCircle />
        </div>
      </div>
      <div className="col-item-1">
        Already have an account?
        {' '}
        <Card.Link href="/signin">Login</Card.Link>
      </div>
      <Form id="signupform" onSubmit={submit}>
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
            <Form.Label>password confirm:</Form.Label>
            <Form.Control {...passwordConfirm} />
          </div>
          <div className="col-item-1">
            <Button variant="primary" id="login-button" type="submit" block>Sign up</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignUpForm;
