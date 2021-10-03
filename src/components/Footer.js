/* eslint-disable max-len */
import React from 'react';
import {
  Card, Navbar, Nav,
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
        {/* <Card.Body>
          <div className="footer-container">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid footer"
              columnClassName="my-masonry-grid_column"
            >
              <div className="footer-container-col">
                <h5 className="footer-subtitle">Philo Art</h5>
                <a href="/about">About</a>
                <a href="/signin">Sign in</a>
                <a href="/signup">Sign up</a>
              </div>
              <div className="footer-container-col">
                <h5 className="footer-subtitle">Tools</h5>
                <a href="/discover">Discover</a>
                <a href="https://picky.photos">Picky</a>
              </div>
              <div className="footer-container-col">
                <h5 className="footer-subtitle">Contact me</h5>
                <a href="/contact">Submit website</a>
              </div>
            </Masonry>
          </div>
        </Card.Body> */}
        <Card.Footer className="text-center text-light">
          <div>
            <Navbar.Brand href="/" className="text-light container-row-0">
              <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="Free Stock Photos"
              />
              Philo Art
            </Navbar.Brand>
          </div>
          <Nav className="justify-content-end">
            <Nav.Link className="text-light" href="/license">License</Nav.Link>
          </Nav>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Footer;
