import React, { useState } from 'react';
import { Modal, Alert } from 'react-bootstrap';
// import useDeleteCollection from '../../../hooks/useDeleteCollection';

const BuyModal = ({
  showBuyModal,
  setShowBuyModal,
}) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  // const [deleteCollection] = useDeleteCollection();

  const deleteSingleCollection = async () => {
    try {
      // await deleteCollection({ id: collectionNow.id });
      setSuccessInfo('Collection is buyed');
      alert('Add marketplace smartcontract integration');
      setTimeout(() => {
        setSuccessInfo('');
        setShowBuyModal(false);
      }, 2000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <div>
      <Modal
        show={showBuyModal}
        onHide={() => setShowBuyModal(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Buy this collection?
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
          <button className="more-photos-btn" type="button" onClick={() => setShowBuyModal(false)}>
            Close
          </button>
          <button className="delete-btn" type="button" onClick={() => deleteSingleCollection()}>
            <i className="bi bi-trash-fill icon-delete" />
            Buy
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BuyModal;
