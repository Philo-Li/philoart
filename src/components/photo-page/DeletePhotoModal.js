import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Alert } from 'react-bootstrap';
import useDeletePhoto from '../../hooks/useDeletePhoto';

const DeletePhotoModal = ({
  photo,
  showDeleteModal,
  setShowDeleteModal,
}) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [deletePhoto] = useDeletePhoto();
  const history = useHistory();

  const deleteSinglePhoto = async () => {
    try {
      await deletePhoto({ id: photo.id });
      setSuccessInfo('Photo is deleted');
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
            Delete this photo?
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
          <button className="delete-btn" type="button" onClick={() => deleteSinglePhoto()}>
            <i className="bi bi-trash-fill icon-delete" />
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeletePhotoModal;
