import React from 'react';

import { Button } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../../others/TextInput';

const ChangePasswordForm = () => (
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
        <Button variant="primary" id="change-password-button" type="submit" block>Update</Button>
      </div>
    </Form>
  </div>
);

export default ChangePasswordForm;
