import React from 'react';
import {
  Switch, Route, useRouteMatch, useHistory,
} from 'react-router-dom';
import { Nav, Image } from 'react-bootstrap';
import Profile from './Profile';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';

const UserPage = () => {
  const { path, url } = useRouteMatch();
  const { authorizedUser } = useAuthorizedUser();
  const history = useHistory();

  if (!authorizedUser) return null;

  const profileImage = authorizedUser && authorizedUser.profileImage
    ? authorizedUser.profileImage
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <div>
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
          <Nav.Link href={`${url}/@${authorizedUser.username}`}>Likes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`${url}/@${authorizedUser.username}/collections`} eventKey={`${url}/${authorizedUser.id}/collections`}>Collections</Nav.Link>
        </Nav.Item>
      </Nav>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:userId`}>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

export default UserPage;
