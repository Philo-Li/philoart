import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';
import TextInput from '../others/TextInput';
import Previews from '../upload/uploadComponent';
import LicenseButton from '../others/LicenseButton';
import TypeButton from '../others/TypeButton';
import StatusButton from '../others/StatusButton';
import TextInputDescription from '../others/TextInputDescription';

const CreateForm = ({
  loading, files, setFiles, setLicense, setType, setStatus,
}) => (
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
    <div className="container-row-license">
      <div className="container-row-license-item">
        Type:
      </div>
      <div className="container-row-license-item">
        <TypeButton setType={setType} />
      </div>
    </div>
    <div className="container-row-license">
      <div className="container-row-license-item">
        Status:
      </div>
      <div className="container-row-license-item">
        <StatusButton setStatus={setStatus} />
      </div>
    </div>
    <div className="container-row-license">
      <div className="container-row-license-item">
        License:
      </div>
      <div className="container-row-license-item">
        <LicenseButton setLicense={setLicense} />
      </div>
      <div className="container-row-license-item">
        <button
          type="button"
          className="license-btn-info license-btn-item"
          onClick={() => window.open('/license')}
        >
          Info
        </button>
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
