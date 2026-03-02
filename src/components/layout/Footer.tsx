"use client";

import Link from "next/link";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

export default function Footer() {
  return (
    <div style={{ fontSize: "1rem" }}>
      <Card className="text-left text-light bg-dark" style={{ borderRadius: 0 }}>
        <Card.Body>
          <div className="footer-container">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid footer"
              columnClassName="my-masonry-grid_column"
            >
              <div className="footer-container-col">
                <h5 className="footer-subtitle">PhiloArt</h5>
                <Link href="/about">About</Link>
                <Link href="/signin">Sign in</Link>
                <Link href="/signup">Sign up</Link>
              </div>
              <div className="footer-container-col">
                <h5 className="footer-subtitle">Tools</h5>
                <Link href="/discover">Discover</Link>
                <a href="https://picky.photos">Picky</a>
              </div>
              <div className="footer-container-col">
                <h5 className="footer-subtitle">Contact us</h5>
                <Link href="/contact">Suggestions</Link>
              </div>
            </Masonry>
          </div>
        </Card.Body>
        <Card.Footer className="text-center text-light">
          <div>
            <Navbar.Brand href="/" className="text-light container-row-0">
              <img
                src="/img/logo/logo1.svg"
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="PhiloArt"
              />
              PhiloArt
            </Navbar.Brand>
            <div>- Share your artworks with the world.</div>
            <div className="container-social-row">
              <div id="twitter">
                Created by Philo
                <button
                  type="button"
                  className="social-icon-btn color-dark"
                  onClick={() => window.open("https://twitter.com/philo2022")}
                >
                  <i className="bi bi-twitter item-social-icon" />
                </button>
              </div>
            </div>
          </div>
          <Nav className="justify-content-end">
            <Nav.Link className="text-light" href="/license">License</Nav.Link>
          </Nav>
        </Card.Footer>
      </Card>
    </div>
  );
}
