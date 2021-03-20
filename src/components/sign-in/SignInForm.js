import React from 'react';

import { Button } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../others/TextInput';

const SignInForm = () => (
  <Form>
    <div className="col-item-1">
      <TextInput
        label="Username"
        name="username"
        type="text"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      <TextInput
        label="Password"
        name="password"
        type="password"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      <Button variant="primary" id="login-button" type="submit" block>Login</Button>
    </div>
  </Form>
);

export default SignInForm;
