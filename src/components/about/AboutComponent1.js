import React from 'react';
import {
  Image, Col, Card,
} from 'react-bootstrap';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 2,
  1000: 1,
};

const AboutComponent = ({ msgToShow }) => {
  if (!msgToShow) return null;
  return (
    <div className="p-3 container-about-row">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <Col>
          <div className="container-col-about">
            <h1 className="subheader">{msgToShow.title}</h1>
            <div className="container-col-about-item col-item-1 subheader2">
              {msgToShow.msgList.map((item) => (
                <div className="container-row-4" key={item.msg}>
                  <div className="row-item-5">
                    <i className={item.icon} />
                  </div>
                  <div className="row-item-5">
                    <h5>{item.msg}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col>
          <Card>
            <Image src={msgToShow.img} width="100%" />
          </Card>
        </Col>
      </Masonry>
    </div>
  );
};

export default AboutComponent;
