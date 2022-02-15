import React, { useState } from 'react';
import { Modal, Alert } from 'react-bootstrap';
// import useDeleteCollection from '../../../hooks/useDeleteCollection';

const ViewOnExplorerModal = ({
  url,
  showViewOnExplorerModal,
  setShowViewOnExplorerModal,
}) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const deleteSingleCollection = async () => {
    try {
      // await deleteCollection({ id: collectionNow.id });
      window.open(url, '_blank');
      setTimeout(() => {
        setSuccessInfo('');
        setShowViewOnExplorerModal(false);
      }, 2000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <div>
      <Modal
        show={showViewOnExplorerModal}
        onHide={() => setShowViewOnExplorerModal(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Show this NFT on blockchain?
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
          <button className="more-photos-btn" type="button" onClick={() => setShowViewOnExplorerModal(false)}>
            Close
          </button>
          <button className="delete-btn" type="button" onClick={() => deleteSingleCollection()}>
            <i className="bi bi-explorer" />
            View
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewOnExplorerModal;
