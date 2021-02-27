/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Switch,
  Route,
  useRouteMatch, useHistory } from 'react-router-dom';
import { Nav, Image } from 'react-bootstrap';
import '../index.css';
import Profile from './Profile';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

// eslint-disable-next-line react/prefer-stateless-function
const UserPage = () => {
  const { path, url } = useRouteMatch();
  const { authorizedUser } = useAuthorizedUser();
  const history = useHistory();

  if (!authorizedUser) return null;

  console.log('authorizedUser', authorizedUser);
  console.log('history path url', history.location.pathname, path, url);
  const profileImage = authorizedUser.profileImage
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
          <Nav.Link href={`${url}/:id`}>Likes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/:id/collections" eventKey="/:id/collections">Collections</Nav.Link>
        </Nav.Item>
      </Nav>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

export default UserPage;
