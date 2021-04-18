/* eslint-disable max-len */
import React, { useState } from 'react';
import { Modal, Spinner, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserCollectionsList from '../UserCollectionsList';
import useCreateCollectionAndCollectPhoto from '../../../hooks/useCreateCollectionAndCollectPhoto';
import TextInput from '../TextInput';

const validationSchema = Yup.object().shape({
  title: Yup
    .string()
    .required('Title is required'),
});

const initialValues = {
  title: '',
};

export const CreateAndSaveForm = ({ loading }) => (
  <Form className="container-create-collection-row">
    <div className="create-collection-row-item">
      <TextInput
        name="title"
        type="text"
        placeholder="Create new and save"
      />
    </div>

    <div className="create-collection-row-item">
      {!loading && (
        <button type="submit" className="create-collection-btn" id="create-button">
          Save
        </button>
      )}
      {loading && (
        <button type="submit" className="create-collection-btn" id="create-loading-button" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </button>
      )}
    </div>
  </Form>
);

const SaveToCollectionsModal = ({
  photo, collectSinglePhoto, showCollectModal, setShowCollectModal,
}) => {
  const [createCollectionAndCollectPhoto] = useCreateCollectionAndCollectPhoto();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value) => {
    const { title } = value;
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <>
      <Modal
        show={showCollectModal}
        onHide={() => setShowCollectModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
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
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ handleSubmit }) => <CreateAndSaveForm onSubmit={handleSubmit} loading={loading} />}
              </Formik>
            </div>
            <div className="col-item-0">
              <UserCollectionsList
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
