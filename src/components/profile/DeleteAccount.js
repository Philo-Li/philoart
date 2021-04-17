import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DeleteAccountModal from './DeleteAccountModal';
// import useDeleteUser from '../../hooks/useDeleteUser';

const DeleteAccount = ({ authorizedUser }) => {
  // const [deleteUser] = useDeleteUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const history = useHistory();

  if (!authorizedUser) return null;

  // const deleteAccount = async (user) => {
  //   // eslint-disable-next-line no-alert
  //   if (window.confirm('You can\'t undo this. Are you sure? ')) {
  //     await deleteUser({ id: user.id });
  //     history.push('/');
  //   }
  // };

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
