/* eslint-disable max-len */
import React from 'react';
import { Card } from 'react-bootstrap';
import aboutImg4 from '../../img/aboutImg4.jpg';
import AboutComponent from './AboutComponent';
import AboutComponentRow from './AboutComponentRow';
import MyImage from './MyImage';

const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
const img2 = 'https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img3 = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80';
const img4 = aboutImg4;

const About = () => {
  const msgToShow = [
    {
      title: 'Outstanding personal artwork site + high quality gallery',
      subtitle1: 'Help you publish and manage your work more easily',
      subtitle2: 'and faster access to the best free copyrighted images',
      intro: 'PhiloArt - Made for creators!',
      imgFirst: true,
      img: { srcTiny: img1, srcSmall: img1, srcLarge: img1 },
    },
    {
      title: 'What you can do with PhiloArt?',
      imgFirst: false,
      img: { srcTiny: img2, srcSmall: img2, srcLarge: img2 },
      msgList: [
        { icon: 'bi bi-download icon-check', msg: 'Upload, manage and publish your work with rich protocols' },
        { icon: 'bi bi-search icon-check', msg: 'Discover and follow favorite artists and get instant updates' },
        { icon: 'bi bi-heart icon-check', msg: 'Discover, search and download high quality free copyrighted images for free' },
        { icon: 'bi bi-plus-square icon-check', msg: 'Like your favorite images and curate your own collections' },
      ],
    },
    {
      title: '谁需要 PhiloArt?',
      imgFirst: true,
      img: { srcTiny: img3, srcSmall: img3, srcLarge: img3 },
      msgList: [
        { icon: 'bi bi-palette icon-check', msg: 'Artist' },
        { icon: 'bi bi-camera icon-check', msg: 'Photographer' },
        { icon: 'bi bi-pencil icon-check', msg: 'Creator' },
        { icon: 'bi bi-shop icon-check', msg: 'Designer' },
        { icon: 'bi bi-emoji-sunglasses icon-check', msg: '...And you' },
      ],
    },
    {
      title: 'Why choose PhiloArt?',
      imgFirst: false,
      img: { srcTiny: img4, srcSmall: img4, srcLarge: img4 },
      msgList: [
        { icon: 'bi bi-check2 icon-check', msg: 'Easily and quickly publish and manage your work with multiple protocols' },
        { icon: 'bi bi-check2 icon-check', msg: 'Discover best works and free copyrighted works' },
        { icon: 'bi bi-check2 icon-check', msg: 'Follow favorite artists' },
        { icon: 'bi bi-check2 icon-check', msg: 'Encourage creativity, inspire and enhance creativity' },
      ],
    },
  ];
  return (
    <div>
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">About PhiloArt</h1>
        </div>
        <Card.Link href="/about/zh" className="col-item-3">中文</Card.Link>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">{msgToShow[0].intro}</h1>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">{msgToShow[0].title}</h1>
        <h3 className="subheader2">
          {msgToShow[0].subtitle1}
        </h3>
        <h3 className="subheader2">
          {msgToShow[0].subtitle2}
        </h3>
      </div>
      <AboutComponent msgToShow={msgToShow[1]} />
      <AboutComponentRow msgToShow={msgToShow[2]} />
      <AboutComponent msgToShow={msgToShow[3]} />
      <div className="p-3 container-about-row">
        <MyImage image={msgToShow[0].img} />
      </div>
      <div className="container-col-login">
        <div className="col-item-3 licence-msg text-1rem">
          <p>
            If you have any questions or suggestions that might make the PhiloArt experience even better, please let us know! You can get in touch with us at philoart42@gmail.com.
          </p>
        </div>
      </div>
      {/* 这世界战争不停，争吵不息，满目疮痍。我想画一点温暖东西，治愈自己，也治愈他人。 */}
    </div>
  );
};

export default About;
