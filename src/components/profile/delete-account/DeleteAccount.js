import React, { useState } from 'react';
import DeleteAccountModal from './DeleteAccountModal';

const DeleteAccount = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const token = localStorage.getItem('philoart-token');

  if (!token) return null;

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <h3>Delete your account</h3>
        </div>
        <div className="profile-item">
          <button className="delete-btn" type="button" onClick={() => setShowDeleteModal(true)}>
            <i className="bi bi-trash-fill icon-delete" />
            Delete
          </button>
        </div>
      </div>
      <DeleteAccountModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </div>
  );
};

export default DeleteAccount;
