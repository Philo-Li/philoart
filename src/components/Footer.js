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

  // const openTwitter = async () => {
  //   window.open('twitter.com/philo2022');
  // };

  return (
    <div style={footerStyle}>
      <Card className="text-left text-light bg-dark" fluid="true">
        <Card.Body>
          <div className="footer-container">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid footer"
              columnClassName="my-masonry-grid_column"
            >
              <div className="footer-container-col">
                <h5 className="footer-subtitle">PhiloArt</h5>
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
                <h5 className="footer-subtitle">Contact us</h5>
                <a href="/contact">Suggestions</a>
              </div>
            </Masonry>
          </div>
        </Card.Body>
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
              PhiloArt
            </Navbar.Brand>
            <div>- For creator</div>
            {/* <div className="container-social-row">
              <div id="instagram" className="text-white">
                <button
                  type="button"
                  className="social-icon-btn"
                  onClick={() => window.open('https://www.instagram.com/philoart2020/')}
                >
                  <i className="bi bi-instagram item-social-icon" />
                </button>
              </div>
              <div id="youtube" className="text-white">
                <button
                  type="button"
                  className="social-icon-btn"
                  onClick={() => window.open('https://youtube.com/c/philoart')}
                >
                  <i className="bi bi-youtube item-social-icon" />
                </button>
              </div>
              <div id="twitter" className="text-white">
                <button
                  type="button"
                  className="social-icon-btn"
                  onClick={() => window.open('https://twitter.com/philo2022')}
                >
                  <i className="bi bi-twitter item-social-icon" />
                </button>
              </div>
            </div> */}
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
