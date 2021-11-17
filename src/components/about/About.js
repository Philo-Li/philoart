/* eslint-disable max-len */
import React from 'react';
import { Image, Card } from 'react-bootstrap';

const About = () => {
  const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
  return (
    <div className="about">
      <div className="container-col-about">
        <div className="col-item-4">
          <h1 className="header">Philo</h1>
        </div>
        <Card.Link href="/about/zh" className="col-item-3">中文</Card.Link>
        <div className="container-profile">
          <div className="profile-item">
            <Image src={img1} width={150} height={150} magin={10} roundedCircle />
          </div>
        </div>
        <div className="container-col-about">
          <h3 className="profile-details">
            出生自中国南方一个风景优美的小山村，曾经的自由职业者，现在是一名软件工程师，未来还想继续搞物理。
          </h3>
          <h3 className="profile-details">
            没有正经学过画画，误打误撞在24岁的这一年正式拿起了画笔，随后便沉迷上了这种创作形式，作品在小范围内获得了认可，并销往多地。
          </h3>
          <h3 className="profile-details">
            这世界战争不停，争吵不息，满目疮痍。我想画一点温暖东西，治愈自己，也治愈他人。
          </h3>
        </div>
        <div className="container-social-row">
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
        <div className="container-col-login">
          <div className="about-footer">
            <p>
              If you have any questions or suggestions, you can send email to philoart42@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
