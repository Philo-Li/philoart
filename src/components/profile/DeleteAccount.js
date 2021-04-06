import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useDeleteUser from '../../hooks/useDeleteUser';

const DeleteAccount = ({ authorizedUser }) => {
  const [deleteUser] = useDeleteUser();
  const history = useHistory();

  if (!authorizedUser) return null;

  const deleteAccount = async (user) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('You can\'t undo this. Are you sure? ')) {
      await deleteUser({ id: user.id });
      history.push('/');
    }
  };

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <h3>Delete your account</h3>
        </div>
        <div className="profile-item">
          <Button variant="apparent" size="sm" onClick={() => deleteAccount(authorizedUser)}>
            <i className="bi bi-trash-fill icon-delete" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
