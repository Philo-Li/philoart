/* eslint-disable max-len */
import React from 'react';
import { Carousel } from 'react-bootstrap';

const cover = 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
// eslint-disable-next-line arrow-body-style
const DailyCover = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={cover}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Pick the best inspiring free stock photos around the world.</h3>
            <p>Free to use, even for commercial purpose. Redirect to the original site to download.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default DailyCover;
