import React from 'react';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const TokenExpireModal = ({
  showTokenExpireModal,
  setShowTokenExpireModal,
}) => {
  const history = useHistory();
  const client = useApolloClient();

  const redirectToSignIn = async () => {
    setShowTokenExpireModal(false);
    localStorage.clear();
    client.resetStore();
    history.push('/signin');
  };

  const handleLogout = async () => {
    localStorage.clear();
    client.resetStore();
    setShowTokenExpireModal(false);
  };

  return (
    <div>
      <Modal
        show={showTokenExpireModal}
        onHide={() => setShowTokenExpireModal(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Session token has expired, please sign in again.
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button className="more-photos-btn" type="button" onClick={() => handleLogout()}>
            Cancel
          </button>
          <button className="more-photos-btn" type="button" onClick={() => redirectToSignIn()}>
            Sign In
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TokenExpireModal;
