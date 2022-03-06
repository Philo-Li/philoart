import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DeleteAccountModal from './DeleteAccountModal';

const DeleteAccount = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const token = localStorage.getItem('philoart-token');

  if (!token) return null;

  return (
    <div className="p-3 container-col-settings">
      <div className="container-profile">
        <div className="profile-item">
          <h3>Delete your account</h3>
        </div>
      </div>
      <div className="d-grid gap-2 margin-tb-2rem">
        <Button
          variant="outline-danger"
          id="delete-account-button"
          alt="delete account button"
          type="submit"
          onClick={() => setShowDeleteModal(true)}
        >
          <i className="bi bi-trash-fill icon-delete" />
          Delete
        </Button>
      </div>

      <DeleteAccountModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </div>
  );
};

export default DeleteAccount;
