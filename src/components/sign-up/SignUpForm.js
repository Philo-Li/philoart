import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../others/TextInput';

const SignUpForm = ({ loading }) => (
  <div>
    <Form>
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
          label="Email Address *"
          name="email"
          type="email"
          placeholder="example@mail.com"
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

      <div className="col-item-1 margin-tb-2rem">
        {!loading && (
          <Button variant="dark" id="signup-button" type="submit" block="true">
            Sign up
          </Button>
        )}
        {loading && (
          <Button variant="dark" id="signup-button-loading" disabled block="true">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        )}
      </div>
    </Form>
  </div>
);

export default SignUpForm;
