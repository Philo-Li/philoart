/* eslint-disable max-len */
import React from 'react';
import { Image, Card } from 'react-bootstrap';
import logo from '../../img/logo/logo2.svg';

const About = () => {
  const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
  return (
    <div className="about">
      <div className="container-col-about">
        <div className="col-item-4">
          <h1 className="header">About</h1>
        </div>
        <Card.Link href="/about/zh" className="col-item-3">中文</Card.Link>
        <div className="container-profile">
          <div className="profile-item">
            <h1>Philo</h1>
          </div>
          <div className="profile-item">
            <Image src={logo} width={150} height={150} magin={10} roundedCircle />
          </div>
        </div>
        <div className="container-col-about">
          <h1 className="subheader">Picky - Best Free Photo Stock Search Engine</h1>
          <h3 className="subheader2">
            Picky is on a mission to collect best free stock photos for you.
          </h3>
          <p>{img1}</p>
        </div>
        <div className="container-social-row">
          <i>Social media:</i>
          <div id="instagram">
            <button
              type="button"
              className="social-icon-btn-dark"
              onClick={() => window.open('https://www.instagram.com/philoart2020/')}
            >
              <i className="bi bi-instagram item-social-icon" />
            </button>
          </div>
          <div id="youtube">
            <button
              type="button"
              className="social-icon-btn-dark"
              onClick={() => window.open('https://youtube.com/c/philoart')}
            >
              <i className="bi bi-youtube item-social-icon" />
            </button>
          </div>
          <div id="twitter">
            <button
              type="button"
              className="social-icon-btn-dark"
              onClick={() => window.open('https://twitter.com/philo2022')}
            >
              <i className="bi bi-twitter item-social-icon" />
            </button>
          </div>
        </div>
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
