/* eslint-disable max-len */
import React from 'react';
import {
  Jumbotron, Image, Row, Col,
} from 'react-bootstrap';
import '../index.css';

const img1 = 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80';

const About = () => {
  const cando = ['Search and download the best free stock photos', 'Like photos', 'Make your own collections'];
  const needpicky = ['designer', 'photographer', 'creater', 'artist', '......'];
  const notallowed = ['Identifiable people may not appear in a bad light or in a way that is offensive.', 'Don\'t sell unaltered copies of a photo or video, e.g. as a poster, print or on a physical product without modifying it first.', 'Don\'t imply endorsement of your product by people or brands on the imagery.', 'Don\'t redistribute or sell the photos and videos on other stock photo or wallpaper platforms.'];
  return (
    <div>
      <div className="p-3">
        <div className="col-item-4">
          <h1>About Picky</h1>
        </div>
      </div>
      <Row className="p-3 container-about">
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Best Free Photo Stock Collection</h1>
            <h3>
              Picky is on a mission to collect best free stock photos for you.
            </h3>
          </div>
        </Col>
        <Col>
          <Image src={img1} width="100%" />
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <Image src={img1} width="100%" />
        </Col>
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">What you can do with Picky?</h1>
            {cando.map((msg) => (
              <div className="col-item-1">
                <div className="container-row-4">
                  <div className="row-item-5">
                    <i className="bi bi-check2 icon-check" />
                  </div>
                  <div className="row-item-5">
                    <h5>{msg}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Best Free Photo Stock Collection</h1>
            <h3>
              Picky is on a mission to make best free stock photos easier to get.
            </h3>
          </div>
        </Col>
        <Col>
          <Image src={img1} width="100%" />
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <Image src={img1} width="100%" />
        </Col>
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Who need Picky?</h1>
            {needpicky.map((msg) => (
              <div className="col-item-1">
                <div className="container-row-4">
                  <div className="row-item-5">
                    <i className="bi bi-check2 icon-check" />
                  </div>
                  <div className="row-item-5">
                    <h5>{msg}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1 className="header-bold">About Picky</h1>
        </div>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1>
            The original website
            {'\''}
            s licenses are almost the same and like this:
          </h1>
        </div>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1 className="header-bold">What is allowed?</h1>
        </div>
        {notallowed.map((msg) => (
          <div className="col-item-1">
            <div className="container-row-4">
              <div className="row-item-5">
                <i className="bi bi-check2 icon-check" />
              </div>
              <div className="row-item-5">
                <h5>{msg}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1 className="header-bold">What is not allowed?</h1>
        </div>
        {notallowed.map((msg) => (
          <div className="col-item-1">
            <div className="container-row-4">
              <div className="row-item-5">
                <i className="bi bi-x icon-x" />
              </div>
              <div className="row-item-5">
                <h5>{msg}</h5>
              </div>
            </div>
          </div>
        ))}
        <div className="container-row-4">
          <div className="row-item-5">
            {notallowed.map((msg) => (
              <div className="col-item-1">
                <div className="container-row-4">
                  <div className="row-item-5">
                    <i className="bi bi-x icon-x" />
                  </div>
                  <div className="row-item-5">
                    <h5>{msg}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Jumbotron className="licence">
            <h1 className="header-bold-white">Legal Simplicity</h1>
            <h3 className="header">
              All photos can be downloaded and used for free.
            </h3>
          </Jumbotron>
        </div>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1>
            You can read the original website
            {'\''}
            s licenses for more purpose.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default About;
