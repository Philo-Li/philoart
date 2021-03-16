import React from 'react';

import { Button } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from './TextInput';

const SignUpForm = () => (
  <div>
    <Form>
      <div className="container-row-signup">
        <div className="">
          <TextInput
            label="First Name *"
            name="firstName"
            type="text"
            placeholder=""
          />
        </div>

        <div className="">
          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder=""
          />
        </div>
      </div>

      <div className="col-item-1">
        <TextInput
          label="Email Address *"
          name="email"
          type="email"
          placeholder="example@mail.com"
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="Username *"
          info=" (only letters, numbers, and underscores)"
          name="username"
          type="username"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="Password *"
          info=" (at least 6 char)"
          name="password"
          type="password"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="Password Confirm *"
          name="confirmPassword"
          type="password"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        <Button variant="primary" id="login-button" type="submit" block>Sign up</Button>
      </div>
    </Form>
  </div>
);

export default SignUpForm;
