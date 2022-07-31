import React from 'react';
import { Col } from 'react-bootstrap';
import MyImage from './MyImage';

const AboutComponent = ({ msgToShow }) => {
  if (!msgToShow) return null;
  return (
    <div className="p-3 container-about-row">
      <Col>
        <MyImage image={msgToShow.img} />
      </Col>
      <Col>
        <div className="container-col-about">
          <h1 className="subheader">{msgToShow.title}</h1>
          <div className="container-col-about-item col-item-1 subheader2">
            {msgToShow.msgList.map((item) => (
              <div className="container-row-4" key={item.msg}>
                <div className="row-item-5">
                  <p>
                    <i className={item.icon} />
                    {item.msg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </div>
  );
};

export default AboutComponent;
