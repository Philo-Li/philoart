/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import {
  Image, Row, Col, Card,
} from 'react-bootstrap';
import '../index.css';
import aboutImg4 from '../img/aboutImg4.jpg';

const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
const img2 = 'https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img3 = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80';
const img4 = aboutImg4;

const TopWebsites = () => {
  const website = [
    'https://unsplash.com/',
    'https://burst.shopify.com/',
    'https://kaboompics.com/',
    'https://gratisography.com/',
    'https://picography.co/',
    'https://www.pexels.com/zh-cn/',
    '......',
  ];

  return (
    <div>
      <div className="container-col-login">
        <div className="profile-item">
          <h1 className="header-bold">Top Free Stock Photos Website:</h1>
        </div>
        <ol className="website-link">
          {website.map((obj, index) => (
            <li key={obj}>
              <a href={obj} className="website-link">{obj}</a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TopWebsites;
