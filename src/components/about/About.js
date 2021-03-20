/* eslint-disable max-len */
import React from 'react';
import {
  Image, Row, Col, Card,
} from 'react-bootstrap';
import aboutImg4 from '../../img/aboutImg4.jpg';

const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
const img2 = 'https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img3 = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80';
const img4 = aboutImg4;

const AboutZh = () => {
  const cando = ['Search and download best free stock photos', 'Discover top free stock photo website', 'Like photos', 'Make your own collections'];
  const needpicky = ['designer', 'photographer', 'creater', 'artist', '......And you'];
  const whychoosepicky = ['Well designed website', 'Well curated collections', 'Discover best free stock photo website', 'Inspire you', 'Stimulate your creativity'];
  return (
    <div>
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">About Picky</h1>
        </div>
        <Card.Link href="/about/zh" className="col-item-3">中文</Card.Link>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1>
            Think paid stock photos are too expensive?
          </h1>
        </div>
        <div className="col-item-3">
          <h1>
            Find it hard to get a nice free photo?
          </h1>
        </div>
        <div className="col-item-3">
          <h1>
            Want to save your money and time?
          </h1>
        </div>
      </div>
      <Row className="p-3 container-about">
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Picky - Best Free Photo Stock Search Engine</h1>
            <h3>
              Picky is on a mission to collect best free stock photos for you.
            </h3>
          </div>
        </Col>
        <Col>
          <Card>
            <Image src={img1} width="100%" />
          </Card>
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <Card>
            <Image src={img2} width="100%" />
          </Card>
        </Col>
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">What you can do with Picky?</h1>
            <div className="col-item-1">
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-download icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[0]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-search icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[1]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-heart icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[2]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-plus-square icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[3]}</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Who need Picky?</h1>
            <div className="col-item-1">
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-shop icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[0]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-camera icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[1]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-pencil icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[2]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-palette icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[3]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-emoji-sunglasses icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[4]}</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <Card>
            <Image src={img3} width="100%" />
          </Card>
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <Card>
            <Image src={img4} width="100%" />
          </Card>
        </Col>
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Why choose Picky?</h1>
            {whychoosepicky.map((msg) => (
              <div className="col-item-1" key={msg}>
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
          <h3>
            If you have any questions or suggestions that might make the Picky experience even better, please let us know! You can get in touch with us at philoart42@gmail.com.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutZh;
