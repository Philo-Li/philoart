import React from 'react';
import {
  Card, Container, Row, Col, Navbar, Nav,
} from 'react-bootstrap';
import logo from '../logo.png';

const Footer = () => {
  const footerStyle = {
    // color: 'green',
    // fontStyle: 'italic',
    // fontSize: 16,
  };

  return (
    <div style={footerStyle}>
      <Card className="text-left text-light bg-dark" fluid="true">
        <Card.Body>
          <Container className="sm my-2 my-lg-5">
            <Row className="justify-content-center xs-6 xl-8">
              <Col className="inline my-2 ml-auto">
                <Card.Title className="text-left text-light  my-lg-0 mb-2"> Picky </Card.Title>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/about">About</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/faq">FAQ</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/signup">Sign up</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/partner">Free photo stock website</Card.Link>
                </Card.Text>
              </Col>
              <Col className="inline my-2 ml-auto">
                <Card.Title className="text-left text-light  my-lg-0 mb-2"> Free Stock Photos </Card.Title>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/collection/2f402d3e-b3e2-46c9-82c7-e821b2bb595f">Black and white photography</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/discover">Inspiring photos</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/wallpaper">Best wallpapers</Card.Link>
                </Card.Text>
              </Col>
              <Col className="inline my-2 ml-auto">
                <Card.Title className="text-left text-light  my-lg-0 mb-2"> Contact us </Card.Title>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="/submit">Submit website</Card.Link>
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer className="text-center text-light">
          <div className="container-row-1">
            <div className="container-row-1">
              <Navbar.Brand href="/" className="text-light container-row-0">
                <img
                  src={logo}
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                  alt="Free Stock Photos"
                />
                Picky
              </Navbar.Brand>
              <Card.Text className="text-light">
                — Discover best free stock photos.
              </Card.Text>
            </div>
            <Nav className="justify-content-end">
              <Nav.Link className="text-light" href="/discover">Terms of Use</Nav.Link>
              <Nav.Link className="text-light" href="/license">License</Nav.Link>
            </Nav>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Footer;
