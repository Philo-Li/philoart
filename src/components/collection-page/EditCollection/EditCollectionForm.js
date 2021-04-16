import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../../others/TextInput';

const EditCollectionForm = ({ loading }) => (
  <Form>
    <div className="col-item-1">
      <TextInput
        label="Title"
        name="title"
        type="title"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      <TextInput
        label="Description"
        name="description"
        type="text"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      {!loading && (
        <Button variant="primary" id="edit-collection-button" type="submit" block>
          Update
        </Button>
      )}
      {loading && (
        <Button variant="primary" id="edit-collection-button-loading" disabled block>
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
);

export default EditCollectionForm;
