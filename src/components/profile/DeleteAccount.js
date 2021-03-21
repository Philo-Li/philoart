import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const DeleteAccount = ({ authorizedUser }) => {
  const history = useHistory();

  if (!authorizedUser) return null;

  const deleteAccount = async (user) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deleted accounts are not recoverable. Are you sure? ')) {
      // await deleteAccount({ id: userId });
      // eslint-disable-next-line no-console
      console.log('delete account', user.username, user.id);
      history.push('/');
    }
  };

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <h3>Delete my Account</h3>
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
