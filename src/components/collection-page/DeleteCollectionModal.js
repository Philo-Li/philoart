import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Alert } from 'react-bootstrap';
import useDeleteCollection from '../../hooks/useDeleteCollection';

const DeleteCollectionModal = ({
  collectionNow,
  showDeleteModal,
  setShowDeleteModal,
}) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [deleteCollection] = useDeleteCollection();
  const history = useHistory();

  const deleteSingleCollection = async () => {
    try {
      await deleteCollection({ id: collectionNow.id });
      setSuccessInfo('Collection is deleted');
      setTimeout(() => { setSuccessInfo(''); setShowDeleteModal(false); history.goBack(); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <div>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Delete this collection?
          </Modal.Title>
        </Modal.Header>
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
        <Modal.Footer>
          <button className="more-photos-btn" type="button" onClick={() => setShowDeleteModal(false)}>
            Close
          </button>
          <button className="delete-btn" type="button" onClick={() => deleteSingleCollection()}>
            <i className="bi bi-trash-fill icon-delete" />
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteCollectionModal;
