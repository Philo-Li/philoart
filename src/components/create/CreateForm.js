import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';
import TextInput from '../others/TextInput';
import Previews from '../upload/uploadComponent';
import TextInputDescription from '../others/TextInputDescription';

const CreateForm = ({ loading, files, setFiles }) => (
  <Form>
    <Previews files={files} setFiles={setFiles} />
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="Title"
          name="title"
          type="text"
          placeholder=""
        />
      </div>
    </div>
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInputDescription
          label="Description"
          name="description"
          type="text"
          placeholder=""
        />
      </div>
    </div>
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="Type"
          name="type"
          type="text"
          placeholder=""
        />
      </div>
    </div>
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="license"
          name="license"
          type="text"
          placeholder=""
        />
      </div>
    </div>
    <div className="col-item-1">
      {!loading && (
        <Button variant="primary" id="create-button" type="submit" block="true">
          Create
        </Button>
      )}
      {loading && (
        <Button variant="primary" id="create-button-loading" disabled>
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

export default CreateForm;
