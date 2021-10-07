/* eslint-disable max-len */
import React from 'react';
import {
  Image, Col, Card,
} from 'react-bootstrap';

const AboutZh = () => {
  const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';

  return (
    <div>
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">关于 Picky</h1>
        </div>
        <Card.Link href="/about" className="col-item-3">English</Card.Link>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">title</h1>
        <h3 className="subheader2">
          subtitle
        </h3>
      </div>
      <div className="p-3 container-about-row">
        <Col>
          <Card>
            <Image src={img1} width="100%" />
          </Card>
        </Col>
      </div>
      <div className="container-col-login">
        <div className="col-item-3 licence-msg">
          <h3>
            如果你有任何疑问或帮助 Picky 实现更好的体验的改进建议，可以发邮件到 philoart42@gmail.com.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutZh;
