/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, Image } from 'react-bootstrap';
import '../index.css';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

// eslint-disable-next-line react/prefer-stateless-function
const Profile = () => {
  const { authorizedUser } = useAuthorizedUser();
  const history = useHistory();

  if (!authorizedUser) return null;

  console.log('authorizedUser', authorizedUser);
  console.log('history', history.location.pathname);
  const profileImage = authorizedUser.profileImage
    ? authorizedUser.profileImage
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  const userPage = `/user/${authorizedUser.id}`;
  const userPageCollections = `/user/${authorizedUser.id}/collections`;
  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image src={profileImage} width={150} height={150} magin={10} roundedCircle />
        </div>
        <div className="profile-item">
          <h1>{authorizedUser.username}</h1>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey={history.location.pathname}>
        <Nav.Item>
          <Nav.Link href={userPage}>Likes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={userPageCollections} eventKey={userPageCollections}>Collections</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Profile;
