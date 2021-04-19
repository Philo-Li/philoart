import React from 'react';
import {
  Nav, Image, Tab, Row, Col,
} from 'react-bootstrap';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import EditProfile from './edit-profile/EditProfile';
import ChangePassword from './change-password/ChangePassword';
import DeleteAccount from './delete-account/DeleteAccount';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const Settings = ({ authorizedUser }) => {
  if (authorizedUser === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  const profileImage = authorizedUser.profileImage
    ? authorizedUser.profileImage
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

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
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Edit Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Change Password</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Delete Account</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <EditProfile authorizedUser={authorizedUser} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ChangePassword authorizedUser={authorizedUser} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <DeleteAccount authorizedUser={authorizedUser} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Settings;
