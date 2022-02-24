import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../../others/TextInput';

const ChangePasswordForm = ({ loading }) => (
  <div>
    <Form>
      <div className="col-item-1">
        <TextInput
          label="Current password *"
          info=""
          name="currentPassword"
          type="password"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="New password *"
          info=" (at least 6 char)"
          name="newPassword"
          type="password"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        {!loading && (
          <Button variant="primary" id="change-password-button" type="submit" block="true">
            Update
          </Button>
        )}
        {loading && (
          <Button variant="primary" id="change-password-button-loading" disabled block="true">
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

export default ChangePasswordForm;
