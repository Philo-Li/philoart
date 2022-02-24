import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../../others/TextInput';

const EditProfileForm = ({ loading }) => (
  <div>
    <Form>
      <div className="container-row-signup">
        <div className="margin-right">
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
          info=""
          name="password"
          type="password"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        {!loading && (
          <Button variant="primary" id="edit-profile-button" type="submit" block="true">
            Update
          </Button>
        )}
        {loading && (
          <Button variant="primary" id="edit-profile-button-loading" disabled block="true">
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

export default EditProfileForm;
