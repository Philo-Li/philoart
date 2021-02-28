/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import '../index.css';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

// eslint-disable-next-line react/prefer-stateless-function
const CollectionDetails = ({ photo }) => {
  const { authorizedUser } = useAuthorizedUser();
  const history = useHistory();

  if (!authorizedUser) return null;

  console.log('authorizedUser', authorizedUser);
  console.log('photo', photo.photo);
  console.log('history', history.location.pathname);

  return (
    <div className="p-3">
      <div className="profile-item">
        <h1>{authorizedUser.username}</h1>
      </div>
      <div className="container-profile">
        <div className="profile-item">
          <Image src={photo.small} magin={10} />
        </div>
        <div className="profile-item">
          <h1>{authorizedUser.username}</h1>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
