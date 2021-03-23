/* eslint-disable max-len */
import React from 'react';
import {
  Card, Container, Navbar, Nav,
} from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import logo from '../img/logo/logo1.svg';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

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
            <div className="">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid footer"
                columnClassName="my-masonry-grid_column"
              >
                <div className="footer-container-col">
                  <h3 className="footer-subtitle">Picky</h3>
                  <a href="/about">About</a>
                  <a href="/faq">FAQ</a>
                  <a href="/signup">Sign up</a>
                  <a href="/partner">Free photo stock website</a>
                </div>
                <div className="footer-container-col">
                  <h3 className="footer-subtitle">Free Stock Photos</h3>
                  <a href="/collection/2f402d3e-b3e2-46c9-82c7-e821b2bb595f">Black and white photography</a>
                  <a href="/discover">Inspiring photos</a>
                  <a href="/collection/eebec1a0-3030-4914-a075-183018a8c413">Cute animals</a>
                </div>
                <div className="footer-container-col">
                  <h3 className="footer-subtitle">Contact us</h3>
                  <a href="/contact">Submit website</a>
                </div>
              </Masonry>
            </div>
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
