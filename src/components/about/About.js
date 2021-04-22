/* eslint-disable max-len */
import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import aboutImg4 from '../../img/aboutImg4.jpg';
import AboutComponent from './AboutComponent';

const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
const img2 = 'https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img3 = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80';
const img4 = aboutImg4;

const About = () => {
  const msgToShow = [
    {
      title: 'Picky - Best Free Photo Stock Search Engine',
      subtitle: 'Picky is on a mission to collect best free stock photos for you.',
      imgFirst: true,
      img: img1,
    },
    {
      title: 'What you can do with Picky?',
      imgFirst: false,
      img: img2,
      msgList: [
        { icon: 'bi bi-download icon-check', msg: 'Search and download photo' },
        { icon: 'bi bi-search icon-check', msg: 'Discover top photo website' },
        { icon: 'bi bi-heart icon-check', msg: 'Like photos' },
        { icon: 'bi bi-plus-square icon-check', msg: 'Make your own collections' },
      ],
    },
    {
      title: 'Who need Picky?',
      imgFirst: true,
      img: img3,
      msgList: [
        { icon: 'bi bi-shop icon-check', msg: 'Designer' },
        { icon: 'bi bi-camera icon-check', msg: 'Photographer' },
        { icon: 'bi bi-pencil icon-check', msg: 'Creator' },
        { icon: 'bi bi-palette icon-check', msg: 'Artist' },
        { icon: 'bi bi-emoji-sunglasses icon-check', msg: '......And you' },
      ],
    },
    {
      title: 'Why choose Picky?',
      imgFirst: false,
      img: img4,
      msgList: [
        { icon: 'bi bi-check2 icon-check', msg: 'Well designed website' },
        { icon: 'bi bi-check2 icon-check', msg: 'Curated collections' },
        { icon: 'bi bi-check2 icon-check', msg: 'Discover top photo website' },
        { icon: 'bi bi-check2 icon-check', msg: 'Inspire you' },
        { icon: 'bi bi-check2 icon-check', msg: 'Stimulate your creativity' },
      ],
    },
  ];
  return (
    <div className="about">
      <div className="container-col-about">
        <div className="col-item-4">
          <h1 className="header">About Picky</h1>
        </div>
        <Card.Link href="/about/zh" className="col-item-3">中文</Card.Link>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">Picky - Best Free Photo Stock Search Engine</h1>
        <h3 className="subheader2">
          Picky is on a mission to collect best free stock photos for you.
        </h3>
      </div>
      <AboutComponent msgToShow={msgToShow[1]} />
      <AboutComponent msgToShow={msgToShow[2]} />
      <AboutComponent msgToShow={msgToShow[3]} />
      <div className="p-3 container-about-row">
        <Col>
          <Card>
            <Image src={img1} width="100%" />
          </Card>
        </Col>
      </div>
      <div className="container-col-login">
        <div className="col-item-3 licence-msg">
          <h5>
            If you have any questions or suggestions that might make the Picky experience even better, please let us know! You can get in touch with us at philoart42@gmail.com.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default About;
