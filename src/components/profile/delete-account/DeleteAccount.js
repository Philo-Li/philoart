import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DeleteAccountModal from './DeleteAccountModal';

const DeleteAccount = ({ authorizedUser }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!authorizedUser) return null;

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <h3>Delete your account</h3>
        </div>
        <div className="profile-item">
          <Button variant="apparent" size="sm" onClick={() => setShowDeleteModal(true)}>
            <i className="bi bi-trash-fill icon-delete" />
          </Button>
        </div>
      </div>
      <DeleteAccountModal
        authorizedUser={authorizedUser}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </div>
  );
};

export default DeleteAccount;
