import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import useEditCollection from '../../../../hooks/useEditCollection';
import EditCollectionContainer from './EditCollectionContainer';

const EditCollectionModal = ({
  collectionNow,
  allCollections,
  setAllCollections,
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
      setSuccessInfo('Collection details updated');

      const updatedAllCollections = allCollections
        .map((obj) => (obj.id === collectionNow.id ? updatedCollectionNow : obj));
      setTimeout(() => {
        setSuccessInfo('');
        setAllCollections(updatedAllCollections);
      }, 2000);
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
    </>
  );
};

export default EditCollectionModal;
