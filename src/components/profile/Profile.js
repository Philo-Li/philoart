import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav, Image } from 'react-bootstrap';

const Profile = ({ authorizedUser }) => {
  const history = useHistory();
  let { username } = useParams();
  username = username.substr(1, username.length - 1);

  // if (!authorizedUser) return null;

  const profileImage = authorizedUser && authorizedUser.profileImage
    ? authorizedUser.profileImage
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  const userPage = `/user/@${username}`;
  const userPageCollections = `/user/@${username}/collections`;
  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image src={profileImage} width={150} height={150} magin={10} roundedCircle />
        </div>
        <div className="profile-item">
          <h1>{username}</h1>
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
