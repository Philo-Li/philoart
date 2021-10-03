import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import useEditCollection from '../../../hooks/useEditCollection';
import EditCollectionContainer from './EditCollectionContainer';

const EditCollectionModal = ({
  collectionNow,
  setCollectionNow,
  showEditCollectionModal,
  setShowEditCollectionModal,
}) => {
  const [editCollection] = useEditCollection();
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const initialValues = {
    title: collectionNow.title,
    description: collectionNow.description || '',
  };

  const onSubmit = async (values) => {
    const variables = {
      collectionId: collectionNow.id,
      newTitle: values.title,
      newDescription: values.description,
    };

    const updatedCollectionNow = {
      ...collectionNow,
      title: values.title,
      description: values.description,
    };
    setLoading(true);

    try {
      await editCollection(variables);
      setCollectionNow(updatedCollectionNow);
      setSuccessInfo('Collection details updated');
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal
        show={showEditCollectionModal}
        onHide={() => setShowEditCollectionModal(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Collection
            {' '}
            {collectionNow.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCollectionContainer
            initialValues={initialValues}
            onSubmit={onSubmit}
            errorInfo={errorInfo}
            successInfo={successInfo}
            loading={loading}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditCollectionModal;
