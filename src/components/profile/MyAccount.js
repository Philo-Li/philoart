import React from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Nav, Image, Tab, Row, Col,
} from 'react-bootstrap';
import EditProfile from './edit-profile/EditProfile';
import DeleteAccount from './DeleteAccount';

const MyAccount = ({ authorizedUser }) => {
  // const history = useHistory();

  if (!authorizedUser) return null;

  const profileImage = authorizedUser.profileImage
    ? authorizedUser.profileImage
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  // const userPage = `/user/${authorizedUser.id}`;
  // const userPageCollections = `/user/${authorizedUser.id}/collections`;
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
                <Nav.Link eventKey="second">Delete Account</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <EditProfile authorizedUser={authorizedUser} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <DeleteAccount authorizedUser={authorizedUser} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default MyAccount;
