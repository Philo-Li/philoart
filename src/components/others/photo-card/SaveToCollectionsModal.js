/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import UserCollectionsList from '../UserCollectionsList';
import useCreateCollectionAndCollectPhoto from '../../../hooks/useCreateCollectionAndCollectPhoto';
import TextInput from '../TextInput';
import useAuthorizedUser from '../../../hooks/useAuthorizedUser';

const initialValues = {
  title: '',
};

export const CreateAndSaveForm = () => (
  <Form className="container-row-3">
    <div className="row-item-6">
      <h5>Save to new collection:</h5>
    </div>

    <div className="row-item-0">
      <TextInput
        name="title"
        type="text"
        placeholder=""
      />
    </div>

    <div className="row-item-6">
      <Button variant="primary" id="create-button" type="submit" block>Save</Button>
    </div>
  </Form>
);

const SaveToCollectionsModal = ({ photo, collectSinglePhoto }) => {
  const [show, setShow] = useState(false);
  const { authorizedUser } = useAuthorizedUser();
  const history = useHistory();
  const [createCollectionAndCollectPhoto] = useCreateCollectionAndCollectPhoto();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const openCollectModal = async () => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      setShow(true);
    }
  };

  const onSubmit = async (value) => {
    const { title } = value;
    try {
      const variables = {
        title,
        description: '',
        public: true,
        photoId: photo.id,
      };
      await createCollectionAndCollectPhoto(variables);
      setSuccessInfo('Saved!');
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <>
      <button type="button" className="photo-card-btn-icon photo-card-btn3" onClick={() => openCollectModal()}>
        <i className="bi bi-plus-square" />
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Save to collections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-col">
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
            <div className="container-row-3">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
              >
                {({ handleSubmit }) => <CreateAndSaveForm onSubmit={handleSubmit} />}
              </Formik>
            </div>
            <div className="col-item-0">
              <UserCollectionsList
                show={show}
                photo={photo}
                collectSinglePhoto={collectSinglePhoto}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SaveToCollectionsModal;
