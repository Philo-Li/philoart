import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import {
  Image, Alert, Button, Spinner,
} from 'react-bootstrap';

const AvatarEdit = ({
  onSubmit, profileImage, errorInfo, successInfo, loading,
}) => {
  const [preview, setPreview] = useState('');

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (previewNow) => {
    setPreview(previewNow);
  };

  return (
    <div className="container-col-settings">
      {errorInfo && (
        <Alert variant="danger">
          {errorInfo}
        </Alert>
      )}
      {successInfo && (
        <Alert variant="success">
          {successInfo}
        </Alert>
      )}
      <div className="container-profile">
        <Avatar
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
        />
        <Image src={preview || profileImage} alt="Preview" width={150} height={150} magin={10} roundedCircle />
      </div>
      <div className="d-grid gap-2 margin-tb-2rem">
        {!loading && (
          <Button variant="primary" id="change-password-button" type="button" onClick={onSubmit}>
            Update
          </Button>
        )}
        {loading && (
          <Button variant="primary" id="change-password-button-loading" disabled>
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
    </div>
  );
};

export default AvatarEdit;
