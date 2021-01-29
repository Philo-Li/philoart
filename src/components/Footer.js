/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
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
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">About</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">FAQ</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Join</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Partner with Picky</Card.Link>
                </Card.Text>
              </Col>
              <Col className="inline my-2 ml-auto">
                <Card.Title className="text-left text-light  my-lg-0 mb-2"> Free Stock Photos </Card.Title>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Popular searches</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Black and white photography</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Inspiring photos</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Best wallpapers</Card.Link>
                </Card.Text>
              </Col>
              <Col className="inline my-2 ml-auto">
                <Card.Title className="text-left text-light  my-lg-0 mb-2"> Contact us </Card.Title>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Submit website</Card.Link>
                </Card.Text>
                <Card.Text className="text-left text-light  my-lg-0 mb-2">
                  <Card.Link className="text-left text-muted my-lg-0 mb-2" href="#">Social media</Card.Link>
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer className="text-center text-light">
          <Row>
            <Navbar.Brand href="/" className="text-light">
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
              — Select the best free stock photos for you.
            </Card.Text>
            <Nav className="justify-content-end">
              <Nav.Link className="text-light" href="/discover">Terms of Use</Nav.Link>
              <Nav.Link className="text-light" href="/license">License</Nav.Link>
            </Nav>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Footer;
